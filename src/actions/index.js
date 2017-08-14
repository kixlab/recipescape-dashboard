

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