import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerButton from "../SideDrawer/DrawerButton/DrawerButton";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerButton onClick={props.sideDrawerOpenedHandler} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems authReduceridToken={props.authReduceridToken} />
        </nav>
    </header>
);

export default toolbar;
