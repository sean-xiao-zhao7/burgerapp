import React, { Component } from "react";
import classes from "./Finish.module.css";
import { connect } from "react-redux";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

//redux
import * as orderActions from "../../../store/actions/order";

class Finish extends Component {
    state = {
        orderFormTemplate: {
            name: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Your name" },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: { type: "emai", placeholder: "Your email" },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Your street" },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zip: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Your zip" },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: "input",
                elementConfig: { type: "text", placeholder: "Your country" },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            method: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", label: "Fastest" },
                        { value: "cheapest", label: "You Cheap Bastard" },
                    ],
                },
                value: "fastest",
            },
            overallValid: false,
        },
        orderConfirmed: false,
    };

    componentDidMount() {
        if (this.props.reduxTotalPrice <= 0) {
            this.props.history.push("/");
        }
    }

    checkValid = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        return isValid;
    };

    onClick = (e) => {
        e.preventDefault();
        this.setState({ orderConfirmed: true, loading: true });

        // massage inputs
        const personalInfo = {};
        for (let id in this.state.orderFormTemplate) {
            personalInfo[id] = this.state.orderFormTemplate[id].value;
        }

        const burgerOrder = {
            ingredients: this.props.reduxIngredients,
            price: this.props.reduxTotalPrice,
            personalInfo: personalInfo,
            localId: this.props.authReducerLocalId,
        };

        this.props.purchaseBurger(burgerOrder, this.props.authReducerIdToken);
    };

    onChangeHandler = (e, id) => {
        e.preventDefault();
        const copyFormTemplate = {
            ...this.state.orderFormTemplate,
        };
        const copyFormElement = {
            ...this.state.orderFormTemplate[id],
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

        this.setState({ orderFormTemplate: copyFormTemplate });
    };

    render() {
        // make form elements
        const formElements = [];
        for (let key in this.state.orderFormTemplate) {
            if (this.state.orderFormTemplate[key] instanceof Object) {
                formElements.push({
                    id: key,
                    config: this.state.orderFormTemplate[key],
                });
            }
        }

        let form = <Spinner />;
        if (!this.props.reduxLoading) {
            form = (
                <form onSubmit={this.onClick}>
                    {formElements.map((formElement) => {
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
                                    !formElement.config.valid &&
                                    formElement.config.touched
                                }
                                shouldValidate={formElement.config.validation}
                            />
                        );
                    })}
                    <Button
                        btnType="Success"
                        onClick={this.onClick}
                        disabled={!this.state.orderFormTemplate.overallValid}
                    >
                        Give us your info now
                    </Button>
                </form>
            );
        }

        return (
            <div className={classes.Finish}>
                <h1>Give us your data now</h1>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reduxIngredients: state.burgerBuilder.ingredients,
        reduxTotalPrice: state.burgerBuilder.totalPrice,
        reduxLoading: state.order.loading,
        authReducerIdToken: state.authReducer.idToken,
        authReducerLocalId: state.authReducer.localId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurger: (orderData, idToken) => {
            dispatch(orderActions.purchaseBurger(orderData, idToken));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Finish, axios));
