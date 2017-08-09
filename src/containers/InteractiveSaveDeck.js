import {connect} from 'react-redux'
import {SaveInput} from '../components/SaveInput'

const saveDeck = (state) => ({})

const InteractiveSaveDeck = connect(
    saveDeck
)(SaveInput)
