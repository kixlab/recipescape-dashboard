import {connect} from 'react-redux'
import {SaveInput} from '../components/SaveInput'
import { addSavedDeck } from '../actions'

const mapDispatchToProps = (dispatch) => ({
    saveDeck: (name) => dispatch(addSavedDeck(name))
  });
  
  const InteractiveSaveDeck = connect(
      null,
      mapDispatchToProps,
  )(SaveInput)
  
  export default InteractiveSaveDeck;