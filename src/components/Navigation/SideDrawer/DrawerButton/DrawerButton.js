import React from 'react';
import classes from './DrawerButton.module.css';

const drawerButton = props => (
    <div className={classes.DrawerToggle} onClick={props.onClick}>
        <div></div>            
        <div></div>            
        <div></div>            
    </div>
);

export default drawerButton;