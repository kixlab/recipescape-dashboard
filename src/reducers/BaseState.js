//convention: states lowercase, collections Uppercase
export const ClusterBaseState = {
    ClusterRule : 'tree',
    RecipeName: 'chocochip',
    ActiveClusters: [],
    SavedClusters: [],
    //recipe ids of recipes currently being displayed in recipe deck
    DisplayedClusters: [],
    InstructionCombos: [],
    IngredientCombos: [],
    highlights: []
    //indicate if two recipes are currently being compared//popup should be shown
}

export const RecipeBaseState = {
    DisplayedRecipes: [],
    SavedDecks: [],
    HighlightedRecipes: [],
    open: false,
}