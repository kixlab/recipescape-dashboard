import { connect } from 'react-redux'
import {SavedDecks} from '../components/SavedDecks'


const mapSavedDecks = (state) => ({
    savedDecks: state.decks.map(deck => deck.name)
})

// const mapDeleteDeck = (state) => ({
//     deleteDeck : deleteDeck
// })

const InteractiveSavedDecks = connect(
    mapSavedDecks
)(SavedDecks)

export default InteractiveSavedDecks