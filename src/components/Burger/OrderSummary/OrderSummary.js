import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((key) => {
            return (
                <li key={key}>
                    <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
                    {this.props.ingredients[key]}
                </li>
            );
        });
        return (
            <Aux>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h3>Order summary</h3>
                    <div>Your unique burger!</div>
                    <ul>{ingredientSummary}</ul>
                    <div>
                        Price before tax: {this.props.totalPrice.toFixed(2)} rupees
                    </div>
                    <div>Tax: {this.props.totalPrice.toFixed(2) * 3.6} rupees</div>
                    <div>
                        Service fee: {this.props.totalPrice.toFixed(2) * 2.8} rupees
                    </div>
                    <div>
                        Gratuities: {this.props.totalPrice.toFixed(2) * 2.7} rupees
                    </div>
                    <div>
                        Final price: {this.props.totalPrice.toFixed(2) * 10.1} rupees
                    </div>
                    <Button onClick={this.props.confirmOrder} buttonType={"Success"}>
                        Confirm & Agree to share us your personal info (18+)
                    </Button>
                    <div>
                        Give us a 5 star review on Yelp! (We are not responsible
                        for food poisoning, don't complain listen to your mama,
                        it's natural selection invented by Darwin)
                    </div>
                </div>
            </Aux>
        );
    }
}

export default OrderSummary;
