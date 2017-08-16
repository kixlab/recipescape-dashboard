import { ADD_RECIPE_DECK, REMOVE_RECIPE_DECK, COMPARE_RECIPES, SAVE_RECIPE_DECK, DELETE_RECIPE_DECK, LOAD_RECIPE_DECK, SELECT_RECIPE, UNSELECT_RECIPE, STOP_COMPARING} from '../constants/actionTypes'
import {RecipeBaseState} from './BaseState'


const recipeDeck = (state = RecipeBaseState, action) => {
    switch(action.type){
        case ADD_RECIPE_DECK:
            if(state.DisplayedRecipes.find((recipe) => recipe.origin_id == action.recipe.origin_id)) return state;
            return Object.assign({}, state, {DisplayedRecipes: [action.recipe, ...state.DisplayedRecipes]})

        case REMOVE_RECIPE_DECK:
            let remaining = state.DisplayedRecipes.filter((recipe) => recipe.origin_id !== action.recipeID)
            if(remaining) return Object.assign({}, state, {DisplayedRecipes: remaining}, { HighlightedRecipes: state.HighlightedRecipes.filter((recipe) => action.recipeID != recipe.origin_id)});
            return  Object.assign({}, state, {DisplayedRecipes: []}, { HighlightedRecipes: state.HighlightedRecipes.filter((recipe) => action.recipeID != recipe.origin_id)});

        case SAVE_RECIPE_DECK:
            return Object.assign({}, state, {SavedDecks: [...state.SavedDecks, { name: action.name, recipes: state.DisplayedRecipes}]});

        case DELETE_RECIPE_DECK:
            remaining = state.SavedDecks.filter((deck) => deck.name !== action.name)
            if(remaining) return Object.assign({}, state, {SavedDecks: remaining});
            return  Object.assign({}, state, {SavedDecks: []});

        case LOAD_RECIPE_DECK:
            let loadedDeck = state.SavedDecks.find((deck) => deck.name == action.name)
            if (loadedDeck) return  Object.assign({}, state, {DisplayedRecipes: loadedDeck.recipes}, {HighlightedRecipes: []});

        case SELECT_RECIPE :
            if(state.HighlightedRecipes.find((recipe) => recipe.origin_id == action.recipe.origin_id)) 
                return Object.assign({}, state, { HighlightedRecipes: state.HighlightedRecipes.filter((recipe) => action.recipe.origin_id != recipe.origin_id)});
            if(state.HighlightedRecipes.length == 2)
                return Object.assign({}, state, { HighlightedRecipes: [state.HighlightedRecipes[0], action.recipe]});
            return Object.assign({}, state, { HighlightedRecipes: [...state.HighlightedRecipes, action.recipe]});
        case COMPARE_RECIPES:
            return Object.assign({}, state, {open: true});            
        case STOP_COMPARING:
            return Object.assign({}, state, {open: false});
        default:
      return state
  }
}

export default recipeDeck;