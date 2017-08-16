import { connect } from 'react-redux'
import { addRecipeDeck, toggleCluster } from '../actions'
import {Clusters} from '../components/charts/Cluster'


const mapStateToProps = (state) => ({
  activeCluster : state.clusters.ActiveClusters
})

const mapDispatchToProps = (dispatch) => ({
  add: (recipe) => dispatch(addRecipeDeck(recipe)),
  select: (cluster) => dispatch(toggleCluster(cluster))
})

const InteractiveClusters = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clusters)

export default InteractiveClusters