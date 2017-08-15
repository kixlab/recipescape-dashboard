import {connect} from 'react-redux'
import {SaveInput} from '../components/SaveInput'
import { addSavedDeck } from '../actions'

const mapStateToProps = (state) => ({
    show: state.recipeDeck.HighlightedRecipes.length == 2
});

const mapDispatchToProps = (dispatch) => ({
    saveDeck: (name) => dispatch(addSavedDeck(name))
  });
  
  const InteractiveSaveDeck = connect(
      mapStateToProps,
      mapDispatchToProps,
  )(SaveInput)
  
  export default InteractiveSaveDeck;