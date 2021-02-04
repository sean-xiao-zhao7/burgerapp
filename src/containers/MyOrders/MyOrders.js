import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order/Order";

import * as orderActions from "../../store/actions/index";

class MyOrders extends Component {
    componentDidMount() {
        this.props.fetchMyOrdersAxios(
            this.props.authReducerIdToken,
            this.props.authReducerLocalId
        );
    }

    render() {
        let slogan = "Give us your money";
        if (this.props.reduxMyOrders.length > 0) {
            slogan = "Thanks 4 your money";
        }
        return (
            <div>
                <h1>{slogan}</h1>
                {this.props.reduxMyOrders.map((order, index) => {
                    return (
                        <Order
                            key={order.id}
                            index={index}
                            ingredients={order.ingredients}
                            totalPrice={+order.price}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reduxMyOrders: state.order.orders,
        authReducerIdToken: state.authReducer.idToken,
        authReducerLocalId: state.authReducer.localId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyOrdersAxios: (idToken, localId) =>
            dispatch(orderActions.fetchMyOrdersAxios(idToken, localId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(MyOrders, axios));
