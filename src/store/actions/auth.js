import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT,
    };
};

export const authSuccess = (firebaseData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        firebaseData: firebaseData,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const authLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expireTime");

    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const register = (email, password, mode) => {
    return (dispatch) => {
        dispatch(authInit());
        const autData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyASvEZQkwBvhI5Bp2XvvjSfmSXLR30XUEE`,
                autData
            )
            .then((response) => {
                localStorage.setItem("idToken", response.data.idToken);
                localStorage.setItem(
                    "expireTime",
                    new Date(
                        new Date().getTime() + response.data.expiresIn * 1000
                    )
                );
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error.message));
            });
    };
};

export const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    };
};

export const autoLogin = () => {
    return (dispatch) => {
        if (
            !localStorage.getItem("idToken") ||
            new Date(localStorage.getItem("expireTime")) <= new Date()
        ) {
            dispatch(authLogout());
        } else {
            axios
                .post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyASvEZQkwBvhI5Bp2XvvjSfmSXLR30XUEE`,
                    { idToken: localStorage.getItem("idToken") }
                )
                .then((response) => {
                    const newExpireTime =
                        new Date(localStorage.getItem("expireTime")) -
                        new Date();
                    dispatch(
                        authSuccess({
                            localId: response.data.users[0].localId,
                            idToken: localStorage.getItem("idToken"),
                            email: response.data.users[0].email,
                        })
                    );
                    dispatch(checkAuthTimeout(newExpireTime / 1000));
                })
                .catch((error) => {
                    dispatch(authFail(error));
                });
        }
    };
};
