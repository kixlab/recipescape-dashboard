//convention: states lowercase, collections Uppercase
export const ClusterBaseState = {
    ClusterRule : 'tree',
    RecipeName: 'chocochip',
    ActiveClusters: [],
    SavedClusters: [],
    DisplayedClusters: [],//recipe ids of recipes currently being displayed in recipe deck
    InstructionCombos: [],
    IngredientCombos: [],
    highlights: []//indicate if two recipes are currently being compared//popup should be shown
}

export const RecipeBaseState = {
    DisplayedRecipes: [],
    SavedDecks: [],
    HighlightedRecipes: [],
    open: false,
}
