import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const initMyOrders = () => {
    return {
        type: actionTypes.INIT_MYORDERS,
    };
};

export const setMyOrders = (orders) => {
    return {
        type: actionTypes.SET_MYORDERS,
        myorders: orders,
    };
};

export const setMyOrdersFail = (error) => {
    return {
        type: actionTypes.SET_MYORDERS_FAIL,
        error: error,
    };
};

export const fetchMyOrdersAxios = (idToken, localId) => {
    return (dispatch) => {
        axios
            .get(
                `burger-orders.json?auth=${idToken}&orderBy="localId"&equalTo="${localId}"`
            )
            .then((response) => {
                const result = [];
                for (let i in response.data) {
                    result.push({
                        ...response.data[i],
                        id: i,
                    });
                }
                dispatch(setMyOrders(result));
            })
            .catch((e) => {
                dispatch(setMyOrdersFail(e.message));
            });
    };
};
