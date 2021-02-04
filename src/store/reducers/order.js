import * as actionTypes from "../actions/actionsTypes";

const initState = {
    orders: [],
    loading: false,
    resetPurchase: false,
    error: null,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                resetPurchase: false,
            };
        case actionTypes.PURCHASE_BURGER_SUCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                resetPurchase: true,
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.INIT_MYORDERS:
            return {
                ...state,
                orders: [],
            };
        case actionTypes.SET_MYORDERS:
            return {
                ...state,
                orders: action.myorders,
            };
        case actionTypes.SET_MYORDERS_FAIL:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
