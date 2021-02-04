import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Crunchy Water", type: "salad" },
    { label: "Red Ring of Death", type: "bacon" },
    { label: "Cheese is going ham", type: "cheese" },
    { label: "Halacious Patty", type: "meat" },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <div>
                Total cost: <strong>{props.price.toFixed(2)}</strong> rupees
            </div>
            {controls.map((control, index) => {
                return (
                    <BuildControl
                        label={control.label}
                        type={control.type}
                        key={index}
                        addIngredientHandler={() => {
                            props.addIngredientHandler(control.type);
                        }}
                        removeIngredientHandler={() =>
                            props.removeIngredientHandler(control.type)
                        }
                        isDisabled={props.disabledInfo[control.type]}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.canOrder}
                onClick={props.updateOrderModal}
            >
                {props.authReducerIdToken
                    ? "Place order"
                    : "Sign up and give us your money!!"}
            </button>
        </div>
    );
};

export default buildControls;
