import { connect } from 'react-redux'
import {SavedDecks} from '../components/SavedDecks'
import { deleteSavedDeck, loadSavedDeck } from '../actions'


const mapStateToProps = (state) => ({
    savedDecks: state.recipeDeck.SavedDecks.map(deck => deck.name)
})

const mapDispatchToProps = (dispatch) => ({
    deleteDeck : (name) => dispatch(deleteSavedDeck(name)),
    loadDeck : (name) => dispatch(loadSavedDeck(name))
})

const InteractiveSavedDecks = connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedDecks)

export default InteractiveSavedDecks