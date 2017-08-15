

export const addRecipeDeck = (recipe) => {
    return {
        type: 'ADD_RECIPE_DECK',
        recipe
    }
}

export const removeRecipeDeck = (recipeID) => {
    return {
        type: 'REMOVE_RECIPE_DECK',
        recipeID
    }
}

export const addSavedDeck = (name) => {
    return{
        type: 'SAVE_RECIPE_DECK',
        name
    }
}

export const deleteSavedDeck = (name) => {
    return{
        type: 'DELETE_RECIPE_DECK',
        name
    }
}

export const loadSavedDeck = (name) => {
    return{
        type: 'LOAD_RECIPE_DECK',
        name
    }
}

export const selectRecipe = (recipe) => {
    return{
        type: 'SELECT_RECIPE',
        recipe
    }
}

export const unselectRecipe = (recipeID) => {
    return {
        type: 'UNSELECT_RECIPE',
        recipeID
    }
}

export const compareRecipes = () => {
    return{
        type: 'COMPARE_RECIPES'
    }
}

export const stopCompareRecipes = () => {
    return{
        type: 'STOP_COMPARING'
    }
}

export const selectCluster = clusterID => {
    return {
        type: 'SELECT_CLUSTER',
        clusterID
    }
}

export const unselectCluster = clusterID => {
    return {
        type: 'UNSELECT_CLUSTER',
        clusterID
    }
}