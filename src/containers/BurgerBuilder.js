import { Component } from "react";

import React from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Aux from "../hoc/Aux";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
    salad: 1,
    cheese: 1,
    meat: 1,
    bacon: 1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        },
        totalPrice: 5, // base price of 5 rupees
        canOrder: true,
        orderModal: false,
        orderConfirmed: false,
    };

    confirmOrder = () => {
        this.setState({ orderConfirmed: true });
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    canOrder={this.state.canOrder}
                    updateOrderModal={this.updateOrderModal}
                />
                <Modal
                    show={this.state.orderModal}
                    closeOrderModal={this.closeOrderModal}
                >
                    <OrderSummary
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        confirmOrder={this.confirmOrder}
                        closeOrderModal={this.closeOrderModal}
                    />
                </Modal>
            </Aux>
        );
    }
}

export default BurgerBuilder;