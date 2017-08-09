import { combineReducers } from 'redux'
import recipeDeck from './recipeDeck'
import clusters from './clusters'

const recipeApp = combineReducers({
    recipeDeck,
    clusters
})

export default recipeApp