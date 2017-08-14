import { connect } from 'react-redux'
import { RecipeCard } from '../components/RecipeCard'
import { removeRecipeDeck } from '../actions'


const mapDispatchToProps = (dispatch) => ({
  removeRecipe: (recipeId) => dispatch(removeRecipeDeck(recipeId))
});

const InteractiveRecipeCard = connect(
    null,
    mapDispatchToProps,
)(RecipeCard)

export default InteractiveRecipeCard;