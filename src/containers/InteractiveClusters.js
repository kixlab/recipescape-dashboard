import { connect } from 'react-redux'
import { addRecipeDeck } from '../actions'
import {Clusters} from '../components/charts/Cluster'


const mapDispatchToProps = (dispatch) => ({
  add: (recipe) => dispatch(addRecipeDeck(recipe))
})

const InteractiveClusters = connect(
  null,
  mapDispatchToProps
)(Clusters)

export default InteractiveClusters