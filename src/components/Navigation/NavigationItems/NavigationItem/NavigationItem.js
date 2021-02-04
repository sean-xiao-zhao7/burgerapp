import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
    if (!props.show) return null;
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.link} activeClassName={classes.active} exact>
                {props.children}
            </NavLink>
        </li>
    );
};

export default navigationItem;
