import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// redux
import * as authActions from "../../../store/actions/auth";

class Logout extends Component {
    componentDidMount() {
        this.props.authLogoutAction();
    }
    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authLogoutAction: () => {
            dispatch(authActions.authLogout());
        },
    };
};

export default connect(null, mapDispatchToProps)(Logout);
