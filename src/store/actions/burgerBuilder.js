import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientType,
    };
};

export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingredientType,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const getIngredientsFailed = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
        ingredients: ingredients,
    };
};

export const getIngredients = () => {
    return (dispatch) => {
        axios
            .get("/ingredients.json")
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((err) => {
                dispatch(getIngredientsFailed());
            });
    };
};
