import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';


const initialState = {
    ingredients : null,
        totalprice: 4,
        error: false,
        building: false
};

const addIngredient =(state, action) => {
    const UpdatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1} ;
          const UpdatedIngredients = updateObject(state.ingredients, UpdatedIngredient);
            const UpdatedState = {
                ingredients: UpdatedIngredients,
                totalprice: state.totalprice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
      
          return updateObject(state,UpdatedState);
};

const removeIngredient = ( state, action) => {
    const UpdatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1} ;
    const UpdatedIngs = updateObject(state.ingredients, UpdatedIng);
      const UpdatedSt = {
          ingredients: UpdatedIngs,
          totalprice: state.totalprice + INGREDIENT_PRICES[action.ingredientName],
          building: true
      }

    return updateObject(state,UpdatedSt);
};

const setIngredients = (state, action) =>{
    return updateObject(state, {
        ingredients:{
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalprice: 4,
        error: false,
        building: false
    });

};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state,{error: true});
    
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

      case actionTypes.REMOVE_INGREDIENT:
          return removeIngredient(state, action);
          
      case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        
      case actionTypes.FETCH_INGREDIENTS_FAILED:
          return fetchIngredientsFailed(state, action);
      default:
          return state;    
  }
  
};

export default reducer;