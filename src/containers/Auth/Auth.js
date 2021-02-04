import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./Auth.module.css";

//redux
import * as actions from "../../store/actions/index";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Enter email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Enter password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
            overallValid: false,
        },
        isLogin: true,
    };

    componentDidUpdate() {
        if (this.props.authReducerIdToken) {
            this.props.history.push("/");
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.authAction(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isLogin ? "signInWithPassword" : "signUp"
        );
    };

    onChangeHandler = (e, id) => {
        e.preventDefault();
        const copyFormTemplate = {
            ...this.state.controls,
        };
        const copyFormElement = {
            ...this.state.controls[id],
        };
        copyFormElement.value = e.target.value;
        copyFormElement.touched = true;

        if (copyFormElement.validation) {
            copyFormElement.valid = this.checkValid(
                copyFormElement.value,
                copyFormElement.validation
            );
        }

        copyFormTemplate[id] = copyFormElement;

        if (copyFormElement.validation) {
            let overallValid = true;
            for (let key in copyFormTemplate) {
                if (
                    key !== "overallValid" &&
                    copyFormTemplate[key].validation
                ) {
                    overallValid = copyFormTemplate[key].valid && overallValid;
                }
            }
            copyFormTemplate.overallValid = overallValid;
        }

        this.setState({ controls: copyFormTemplate });
    };

    checkValid = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        return isValid;
    };

    switchMode = () => {
        this.setState((prevState) => {
            return { isLogin: !prevState.isLogin };
        });
    };

    render() {
        // make form elements
        const formElements = [];
        for (let key in this.state.controls) {
            if (this.state.controls[key] instanceof Object) {
                formElements.push({
                    id: key,
                    config: this.state.controls[key],
                });
            }
        }
        const form = formElements.map((formElement) => {
            return (
                <Input
                    key={formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    inputtype={formElement.config.elementType}
                    value={formElement.config.value}
                    onChangeHandler={(event) =>
                        this.onChangeHandler(event, formElement.id)
                    }
                    invalid={
                        !formElement.config.valid && formElement.config.touched
                    }
                    shouldValidate={formElement.config.validation}
                />
            );
        });

        if (this.props.authReducerLoading) {
            return <Spinner />;
        }

        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                    {this.props.authReducerError}
                    {this.state.isLogin ? (
                        <div>
                            <Button btnType="Success" onClick={this.onSubmit}>
                                Login
                            </Button>
                            <Button btnType="Success" onClick={this.switchMode}>
                                New user register here
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button btnType="Success" onClick={this.onSubmit}>
                                Register
                            </Button>
                            <Button btnType="Success" onClick={this.switchMode}>
                                Existing user login here
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authReducerLoading: state.authReducer.loading,
        authReducerError: state.authReducer.error,
        authReducerIdToken: state.authReducer.idToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authAction: (email, password, mode) =>
            dispatch(actions.register(email, password, mode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
