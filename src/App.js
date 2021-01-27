import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import MyOrders from "./containers/MyOrders/MyOrders";

class App extends Component {
    state = {
        show: true,
    };

    componentDidMount() {}

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/myorders" component={MyOrders} />
                </Switch>
            </Layout>
        );
    }
}

export default App;
