const recipeDeck = (state = {}, action) => {
    switch(action.type){
        case 'ADD_RECIPE_DECK': 
            if(state.recipes) //check initial case, else recipe is added to beginning of array
                return Object.assign({}, state, {recipes: [action.recipeID, ...state.recipes]})
            return Object.assign({}, state, {recipes: [action.recipeID]})
        case 'REMOVE_RECIPE_DECK':
            return state.recipes.filter((id) => id != action.recipeID)
        case 'COMPARE_RECIPES':
            //TODO
            return state
        default:
      return state
  }
}