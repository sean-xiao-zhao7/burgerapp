import * as actionTypes from "../actions/actionsTypes";

const initState = {
    idToken: null,
    localId: null,
    email: null,
    error: null,
    loading: false,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.firebaseData.idToken,
                localId: action.firebaseData.localId,
                email: action.firebaseData.email,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                localId: null,
                email: null,
                error: null,              
                loading: false,
            };
        default:
            return state;
    }
};

export default authReducer;
