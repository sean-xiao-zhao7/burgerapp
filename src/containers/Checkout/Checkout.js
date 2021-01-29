import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Finish from "./Finish/Finish";

class Checkout extends Component {
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
                    ingredients={this.props.reduxIngredients}
                    onSuccess={this.onSuccess}
                    onCancel={this.onCancel}
                />
                <Route
                    path={this.props.match.url + "/finish"}
                    component={Finish}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reduxIngredients: state.ingredients,
        reduxTotalPrice: state.totalPrice,
    };
};

export default connect(mapStateToProps)(Checkout);
