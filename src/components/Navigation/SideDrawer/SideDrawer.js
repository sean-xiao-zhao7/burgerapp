import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = (props) => {
    let drawerCSS = [classes.SideDrawer, classes.Close];
    if (props.isShowing) {
        drawerCSS = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop
                show={props.isShowing}
                closeOrderModal={props.sideDrawerClosedHandler}
            />
            <div className={drawerCSS.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                        authReduceridToken={props.authReduceridToken}
                    />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
