import React from 'react';
import NavgiationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css'

const navigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavgiationItem link="/" active>Burger Builder</NavgiationItem>
            <NavgiationItem link="/">Checkout</NavgiationItem>
        </ul>
    );
};

export default navigationItems;