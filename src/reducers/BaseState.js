//convention: states lowercase, collections Uppercase
export const ClusterBaseState = {
  ClusterRule: "tree",
  RecipeName: "chocochip",
  ActiveClusters: [],
  SavedClusters: [],
  DisplayedClusters: [],
  highlights: []
};

export const HistogramBaseState = {
  InstructionCombos: [],
  IngredientCombos: []
};

export const RecipeBaseState = {
  DisplayedRecipes: [],
  SavedDecks: [],
  HighlightedRecipes: [],
  open: false,
  points: [],
  centers: []
};
