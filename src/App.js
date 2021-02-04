import "./App.css";
import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import MyOrders from "./containers/MyOrders/MyOrders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

// redux
import * as actions from "./store/actions/index";

class App extends Component {
    state = {
        show: true,
    };

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/myorders" component={MyOrders} />
                    <Route path="/login" exact component={Auth} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         authReducerIdToken: state.authReducer.idToken,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        autoLogin: () => {
            dispatch(actions.autoLogin());
        },
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
