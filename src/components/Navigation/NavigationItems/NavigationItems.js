import React from "react";
import NavgiationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavgiationItem link="/" show>Burger Builder</NavgiationItem>
            <NavgiationItem link="/login" show={!props.authReduceridToken}>Login</NavgiationItem>
            <NavgiationItem link="/myorders" show={props.authReduceridToken}>My Orders</NavgiationItem>
            <NavgiationItem link="/logout" show={props.authReduceridToken}>Logout</NavgiationItem>
        </ul>
    );
};

export default navigationItems;
