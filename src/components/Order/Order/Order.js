import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
    return (
        <div className={classes.Order}>
            <h2>Order #{props.index + 1}</h2>
            <p>Ingredients: </p>
            <ul>
                {Object.keys(props.ingredients).map(key => {
                    return <li key={key}><strong>{key}</strong>: {props.ingredients[key]}</li>
                })}
            </ul>
            <p>Price: {props.totalPrice.toFixed(2)}</p>
        </div>
    );
};

export default order;
