import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    sideDrawerOpenedHandler={this.sideDrawerOpenedHandler}
                    authReduceridToken={this.props.authReduceridToken}
                />
                <SideDrawer
                    isShowing={this.state.showSideDrawer}
                    sideDrawerClosedHandler={this.sideDrawerClosedHandler}
                    authReduceridToken={this.props.authReduceridToken}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authReduceridToken: state.authReducer.idToken,
    };
};

export default connect(mapStateToProps, null)(Layout);
