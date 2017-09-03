import {connect} from 'react-redux'
import {ClusterSelection} from '../components/clusterField'
import { toggleCluster } from '../actions'

const mapStateToProps = (state) => ({
    clusters: state.clusters.ActiveClusters
});

const mapDispatchToProps = (dispatch) => ({
    onClick : (index) => dispatch(toggleCluster(index))
})

  
  const InteractiveClusterSelection = connect(
      mapStateToProps,
      mapDispatchToProps
  )(ClusterSelection)
  
  export default InteractiveClusterSelection;