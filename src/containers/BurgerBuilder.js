import React, { Component } from "react";
import axios from "../axios-orders";
import { connect } from "react-redux";

import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import Aux from "../hoc/Aux";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../store/actions";

class BurgerBuilder extends Component {
    state = {
        orderModal: false,
        error: null,
    };

    componentDidMount() {
        axios
            .get("/ingredients.json")
            .then((response) => {
                this.setState({ ingredients: response.data });
            })
            .catch((err) => this.setState({ error: true }));
    }

    confirmOrder = () => {
        this.props.history.push({ pathname: "/checkout" });
    };

    closeOrderModal = () => {
        this.setState({ orderModal: false });
    };

    updateOrderModal = () => {
        this.setState({ orderModal: true });
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
                        />
                    </Aux>
                ) : this.state.error ? (
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
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientType: ingredientType,
            });
        },
        removeIngredientAction: (ingredientType) => {
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientType: ingredientType,
            });
        },
    };
};

const mapStateToProps = (state) => {
    return {
        reduxIngredients: state.ingredients,
        reduxTotalPrice: state.totalPrice,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
