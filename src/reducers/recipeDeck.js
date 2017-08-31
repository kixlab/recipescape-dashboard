import { ADD_RECIPE_DECK, REMOVE_RECIPE_DECK, COMPARE_RECIPES, SAVE_RECIPE_DECK, DELETE_RECIPE_DECK, LOAD_RECIPE_DECK, SELECT_RECIPE, UNSELECT_RECIPE, STOP_COMPARING, UNSELECT_ALL_RECIPES} from '../constants/actionTypes'
import {RecipeBaseState} from './BaseState'
import axios from 'axios'
const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"

const recipeDeck = (state = RecipeBaseState, action) => {
    console.log(state)
    switch(action.type){
        case ADD_RECIPE_DECK:
            if(state.DisplayedRecipes.find((recipe) => 
                recipe.origin_id == action.recipe.origin_id)) return Object.assign({}, state, 
                    { DisplayedRecipes: state.DisplayedRecipes.filter((recipe) => recipe.origin_id !== action.recipe.origin_id)}, 
                    { HighlightedRecipes: state.HighlightedRecipes.filter((recipeID) => action.recipe.origin_id != recipeID)});;
            return Object.assign({}, state, {DisplayedRecipes: [action.recipe, ...state.DisplayedRecipes]})

        case REMOVE_RECIPE_DECK:
            let remaining = state.DisplayedRecipes.filter((recipe) => recipe.origin_id !== action.recipeID)
            if(remaining) return Object.assign({}, state, {DisplayedRecipes: remaining}, { HighlightedRecipes: state.HighlightedRecipes.filter((recipeID) => action.recipeID != recipeID)});
            return  Object.assign({}, state, {DisplayedRecipes: []}, { HighlightedRecipes: []});
        
        case UNSELECT_ALL_RECIPES:
            return Object.assign({}, state, {DisplayedRecipes: []}, { HighlightedRecipes: []});

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
            if(state.HighlightedRecipes.find((recipeID) => recipeID == action.recipeID)) 
                return Object.assign({}, state, { HighlightedRecipes: state.HighlightedRecipes.filter((recipeID) => action.recipeID != recipeID)});
            if(state.HighlightedRecipes.length == 2)
                return Object.assign({}, state, { HighlightedRecipes: [state.HighlightedRecipes[0], action.recipeID]});
            return Object.assign({}, state, { HighlightedRecipes: [...state.HighlightedRecipes, action.recipeID]});
        case COMPARE_RECIPES:
            return Object.assign({}, state, { open: true }, { recipeCompareData: getIngredients({ recipe_ids: state.HighlightedRecipes }) });
        case STOP_COMPARING:
            return Object.assign({}, state, {open: false});
        default:
      return state
  }
}


async function getIngredients(HighlightedRecipes) {
    const recipes_resp = await axios.post(BASE_URL + `nodes`, HighlightedRecipes)
    .then(resp => resp.data)
    return recipes_resp
}

export default recipeDeck;