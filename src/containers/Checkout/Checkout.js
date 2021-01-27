import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Finish from "./Finish/Finish";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1,
        },
        totalPrice: 0,
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === "totalPrice") {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    }

    onSuccess = () => {
        this.props.history.replace("/checkout/finish");
    };

    onCancel = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onSuccess={this.onSuccess}
                    onCancel={this.onCancel}
                />
                <Route
                    path={this.props.match.url + "/finish"}
                    render={(props) => (
                        <Finish
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
