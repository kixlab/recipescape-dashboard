import { connect } from 'react-redux'
import { addRecipeDeck, toggleCluster, removeRecipeDeck } from '../actions'
import {Clusters} from '../components/charts/Cluster'


const mapStateToProps = (state) => ({
  activeCluster : state.clusters.ActiveClusters,
  selectedRecipes : state.recipeDeck.DisplayedRecipes.map(d => d.origin_id),
  highlights: state.clusters.highlights
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