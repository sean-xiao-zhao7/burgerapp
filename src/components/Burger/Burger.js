import React, { Component } from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import PropTypes from 'prop-types';

class Burger extends Component {
    sum = Object.values(this.props.ingredients).reduce((curr, next) => curr + next, 0);

    render() {
        if (this.sum <= 0) {
            return <div className={classes.Burger}>
                Please provide ingredients.
            </div>
        }

        return (
            <div className={classes.Burger}>
                <BurgerIngredient type='bread-top' />
                {
                    Object.keys(this.props.ingredients).map((ingredientKey, index) => {
                        return [...Array(this.props.ingredients[ingredientKey])].map((value, index2) => {
                            return <BurgerIngredient type={ingredientKey} key={index2} />;
                        })
                    })
                }
                <BurgerIngredient type='bread-bottom' />
            </div>
        );
    }
};

Burger.propTypes = {
    ingredients: PropTypes.object.isRequired,    
};

export default Burger;