import React, { Component } from "react";
import axios from "../axios-orders";

import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import Aux from "../hoc/Aux";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
    salad: 1,
    cheese: 1,
    meat: 1,
    bacon: 1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5, // base price of 5 rupees
        canOrder: true,
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) +
                    "=" +
                    encodeURIComponent(this.state.ingredients[i])
            );
        }
        queryParams.push(encodeURIComponent('totalPrice') + '=' + encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join("&");

        this.props.history.push({ pathname: "/checkout", search: queryString });
    };

    closeOrderModal = () => {
        this.setState({ orderModal: false });
    };

    updateOrderModal = () => {
        this.setState({ orderModal: true });
    };

    updateCanOrder = (newIngredients) => {
        const sum = Object.keys(newIngredients)
            .map((key) => {
                return newIngredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ canOrder: sum > 0 });
    };

    addIngredientHandler = (ingredientType) => {
        const newIngredients = {
            ...this.state.ingredients,
        };
        newIngredients[ingredientType] =
            this.state.ingredients[ingredientType] + 1;
        const newTotalPrice =
            this.state.totalPrice + INGREDIENTS_PRICES[ingredientType];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newTotalPrice,
        });
        this.updateCanOrder(newIngredients);
    };

    removeIngredientHandler = (ingredientType) => {
        const newIngredients = {
            ...this.state.ingredients,
        };
        newIngredients[ingredientType] =
            this.state.ingredients[ingredientType] === 0
                ? this.state.ingredients[ingredientType]
                : this.state.ingredients[ingredientType] - 1;
        const newTotalPrice =
            this.state.totalPrice - INGREDIENTS_PRICES[ingredientType];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newTotalPrice,
        });
        this.updateCanOrder(newIngredients);
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }

        return (
            <Aux>
                {this.state.ingredients ? (
                    <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            addIngredientHandler={this.addIngredientHandler}
                            removeIngredientHandler={
                                this.removeIngredientHandler
                            }
                            disabledInfo={disabledInfo}
                            price={this.state.totalPrice}
                            canOrder={this.state.canOrder}
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
                    ) : this.state.ingredients ? (
                        <OrderSummary
                            totalPrice={this.state.totalPrice}
                            ingredients={this.state.ingredients}
                            confirmOrder={this.confirmOrder}
                            closeOrderModal={this.closeOrderModal}
                        />
                    ) : null}
                </Modal>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
