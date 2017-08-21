import { connect } from 'react-redux'
import { initActiveClusters} from '../actions'
import { App } from '../components/App'


const mapStateToProps = (state) => ({
  dishname : state.clusters.RecipeName,
  clusterRule: state.clusters.ClusterRule
}) 

const mapDispatchToProps = (dispatch) => ({
  initActiveClusters: (activeClusters) => dispatch(initActiveClusters(activeClusters))
})

const InitApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default InitApp