import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Thanks for your money!</h1>
            <div style={{ width: "100%", height: "300px", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Success" onClick={props.onSuccess}>Done</Button>
            <Button btnType="Danger" onClick={props.onCancel}>Cancel</Button>
        </div>
    );
};

export default CheckoutSummary;
