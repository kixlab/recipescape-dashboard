import { connect } from "react-redux";
import { RecipeDeck } from "../components/RecipeDeck";

const mapStateToProps = state => {
  return {
    recipes: state.recipeDeck.DisplayedRecipes
  };
};

const InteractiveRecipeDeck = connect(mapStateToProps)(RecipeDeck);

export default InteractiveRecipeDeck;
