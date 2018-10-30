import { connect } from "react-redux";
import { RecipeCard } from "../components/RecipeCard";
import { removeRecipeDeck, selectRecipe, unselectRecipe } from "../actions";

const mapStateToProps = state => ({
  highlight: state.recipeDeck.HighlightedRecipes
});

const mapDispatchToProps = dispatch => ({
  removeRecipe: recipeId => dispatch(removeRecipeDeck(recipeId)),
  selectRecipe: recipe => dispatch(selectRecipe(recipe)),
  unselectRecipe: recipeID => dispatch(unselectRecipe(recipeID))
});

const InteractiveRecipeCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeCard);

export default InteractiveRecipeCard;
