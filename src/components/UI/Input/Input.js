import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
    let inputElement = null;
    const classesArray = [classes.Input];

    if (props.invalid && props.shouldValidate) {
        classesArray.push(classes.Invalid);
    }

    switch (props.inputtype) {
        case "input":
            inputElement = (
                <input
                    {...props.elementConfig}
                    className={classesArray.join(" ")}
                    value={props.value}
                    onChange={props.onChangeHandler}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    {...props.elementConfig}
                    className={classes.Input}
                    value={props.value}
                    onChange={props.onChangeHandler}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={classes.Input}
                    value={props.value}
                    onChange={props.onChangeHandler}
                >
                    {props.elementConfig.options.map((option) => {
                        return (
                            <option key={option.label} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.elementConfig}
                    className={classes.Input}
                    value={props.value}
                    onChange={props.onChangeHandler}
                />
            );
            break;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
