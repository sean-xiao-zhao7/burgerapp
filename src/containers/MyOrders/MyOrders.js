import React, { Component } from "react";
// import classes from "./MyOrders.module.css";
import axios from "../../axios-orders";

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from "../../components/Order/Order/Order";

class MyOrders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios
            .get("burger-orders.json")
            .then((r) => {
                const done = [];
                for (let i in r.data) {
                    done.push({
                        ...r.data[i],
                        id: i
                    });
                }
                this.setState({ orders: done, loading: false });
            })
            .catch((e) => {
                console.log(e.message);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                <h1>Your orders sucker</h1>
                {this.state.orders.map((order, index) => {
                    return <Order key={order.id} index={index} ingredients={order.ingredients} totalPrice={+order.price} />
                })}
            </div>
        );
    }
}

export default withErrorHandler(MyOrders, axios);
