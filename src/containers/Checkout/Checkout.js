import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Finish from "./Finish/Finish";

// redux
import * as actions from "../../store/actions/index";

class Checkout extends Component {
    componentDidMount() {
        this.props.purchaseBurgerInit();
    }

    onSuccess = () => {
        this.props.history.replace("/checkout/finish");
    };

    onCancel = () => {
        this.props.history.goBack();
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.reduxIngredients && !this.props.reduxResetPurchase) {
            summary = (
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
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        reduxIngredients: state.burgerBuilder.ingredients,
        reduxTotalPrice: state.burgerBuilder.totalPrice,
        reduxResetPurchase: state.order.resetPurchase,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurgerInit: () => {
            dispatch(actions.purchaseBurgerInit());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
