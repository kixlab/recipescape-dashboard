import { ADD_RECIPE_DECK, REMOVE_RECIPE_DECK, COMPARE_RECIPES, SAVE_RECIPE_DECK, DELETE_RECIPE_DECK, LOAD_RECIPE_DECK} from '../constants/actionTypes'
import {RecipeBaseState} from './BaseState'


const recipeDeck = (state = RecipeBaseState, action) => {
    console.log(state)
    switch(action.type){
        case ADD_RECIPE_DECK:
            if(state.DisplayedRecipes.find((recipe) => recipe.origin_id == action.recipe.origin_id)) return state;
            return Object.assign({}, state, {DisplayedRecipes: [action.recipe, ...state.DisplayedRecipes]})
        case REMOVE_RECIPE_DECK:
            let remaining = state.DisplayedRecipes.filter((recipe) => recipe.origin_id !== action.recipeID)
            if(remaining) return Object.assign({}, state, {DisplayedRecipes: remaining});
            return  Object.assign({}, state, {DisplayedRecipes: []});
        case SAVE_RECIPE_DECK:
            return Object.assign({}, state, {SavedDecks: [...state.SavedDecks, { name: action.name, recipes: state.DisplayedRecipes}]});
        case DELETE_RECIPE_DECK:
            remaining = state.SavedDecks.filter((deck) => deck.name !== action.name)
            if(remaining) return Object.assign({}, state, {SavedDecks: remaining});
            return  Object.assign({}, state, {SavedDecks: []});
        case LOAD_RECIPE_DECK:
            let loadedDeck = state.SavedDecks.find((deck) => deck.name == action.name)
            if (loadedDeck) return  Object.assign({}, state, {DisplayedRecipes: loadedDeck.recipes});
        case COMPARE_RECIPES:
            //TODO
            return state
        // case SAVE_RECIPE_DECK
        default:
      return state
  }
}

export default recipeDeck;