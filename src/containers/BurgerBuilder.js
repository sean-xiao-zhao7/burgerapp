import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../axios-orders";

import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import Aux from "../hoc/Aux";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

// redux
import * as burgerBuilderActions from "../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        orderModal: false,
    };

    componentDidMount() {
        this.props.setIngredientAction();
    }

    confirmOrder = () => {
        this.props.history.push({ pathname: "/checkout" });
    };

    closeOrderModal = () => {
        this.setState({ orderModal: false });
    };

    updateOrderModal = () => {
        if (this.props.authReducerIdToken) {
            this.setState({ orderModal: true });
        } else {
            this.props.history.push("/login");
        }
    };

    updateCanOrder = () => {
        const sum = Object.keys(this.props.reduxIngredients)
            .map((key) => {
                return this.props.reduxIngredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    render() {
        const disabledInfo = {
            ...this.props.reduxIngredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = this.props.reduxIngredients[key] <= 0;
        }

        return (
            <Aux>
                {this.props.reduxIngredients ? (
                    <Aux>
                        <Burger ingredients={this.props.reduxIngredients} />
                        <BuildControls
                            addIngredientHandler={
                                this.props.addIngredientAction
                            }
                            removeIngredientHandler={
                                this.props.removeIngredientAction
                            }
                            disabledInfo={disabledInfo}
                            price={this.props.reduxTotalPrice}
                            canOrder={this.updateCanOrder()}
                            updateOrderModal={this.updateOrderModal}
                            authReducerIdToken={this.props.authReducerIdToken}
                        />
                    </Aux>
                ) : this.props.error ? (
                    <div>Error loading ingredients</div>
                ) : null}

                <Modal
                    show={this.state.orderModal}
                    closeOrderModal={this.closeOrderModal}
                >
                    {this.state.loading ? (
                        <Spinner />
                    ) : this.props.reduxIngredients ? (
                        <OrderSummary
                            totalPrice={this.props.reduxTotalPrice}
                            ingredients={this.props.reduxIngredients}
                            confirmOrder={this.confirmOrder}
                            closeOrderModal={this.closeOrderModal}
                        />
                    ) : null}
                </Modal>
            </Aux>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientAction: (ingredientType) => {
            dispatch(burgerBuilderActions.addIngredient(ingredientType));
        },
        removeIngredientAction: (ingredientType) => {
            dispatch(burgerBuilderActions.removeIngredient(ingredientType));
        },
        setIngredientAction: () => {
            dispatch(burgerBuilderActions.getIngredients());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        reduxIngredients: state.burgerBuilder.ingredients,
        reduxTotalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        authReducerIdToken: state.authReducer.idToken,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
