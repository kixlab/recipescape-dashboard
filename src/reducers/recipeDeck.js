import { ADD_RECIPE_DECK, REMOVE_RECIPE_DECK, COMPARE_RECIPES } from '../constants/actionTypes'
import {RecipeBaseState} from './BaseState'


const recipeDeck = (state = RecipeBaseState, action) => {
    switch(action.type){
        case ADD_RECIPE_DECK:
            if(state.DisplayedRecipes.find((recipe) => recipe.origin_id == action.recipe.origin_id)) return state;
            return Object.assign({}, state, {DisplayedRecipes: [action.recipe, ...state.DisplayedRecipes]})
            break;
        case REMOVE_RECIPE_DECK:
            console.log(action.recipeID)
            let remaining = state.DisplayedRecipes.filter((recipe) => recipe.origin_id !== action.recipeID)
            console.log(remaining)
            if(remaining) return Object.assign({}, state, {DisplayedRecipes: remaining});;
            console.log(Object.assign({}, state, {DisplayedRecipes: []}));
            return  Object.assign({}, state, {DisplayedRecipes: []});
            break;
        case COMPARE_RECIPES:
            //TODO
            return state
        // case SAVE_RECIPE_DECK
        default:
      return state
  }
}

export default recipeDeck;