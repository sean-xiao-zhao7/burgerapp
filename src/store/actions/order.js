import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT,
    };
};

export const purchaseBurgerSucess = (name, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCESS,
        id: name,
        orderData: orderData,
    };
};

export const purchaseBurgerFailed = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, idToken) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post(`/burger-orders.json?auth=${idToken}`, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSucess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFailed(error.response.data.error.message));
            });
    };
};
