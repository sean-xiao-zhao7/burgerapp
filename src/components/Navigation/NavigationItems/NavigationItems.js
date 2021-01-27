import React from "react";
import NavgiationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavgiationItem link="/">Burger Builder</NavgiationItem>
            <NavgiationItem link="/myorders">My Orders</NavgiationItem>
        </ul>
    );
};

export default navigationItems;
