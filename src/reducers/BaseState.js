//convention: states lowercase, collections Uppercase
export const ClusterBaseState = {

    SavedClusters: [],
 //recipe ids of recipes currently being displayed in recipe deck
    DisplayedClusters: [],
    //indicate if two recipes are currently being compared//popup should be shown
}

export const RecipeBaseState = {
    DisplayedRecipes: [],
    SavedDecks: [],
    HighlightedRecipes: {first: {}, second: {}}
}
