import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0,
    },
    totalPrice: 5, // base price of 5 rupees
    prices: {
        salad: 1,
        cheese: 1,
        meat: 1,
        bacon: 1,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]:
                        state.ingredients[action.ingredientType] + 1,
                },
                totalPrice:
                    state.totalPrice + state.prices[action.ingredientType],
            };
        case actionTypes.REMOVE_INGREDIENT:
            if (state[action.ingredientType] === 0) {
                return state;
            } else {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientType]:
                            state.ingredients[action.ingredientType] - 1,
                    },
                    totalPrice:
                        state.totalPrice - state.prices[action.ingredientType],
                };
            }
        default:
            return state;
    }
};

export default reducer;
