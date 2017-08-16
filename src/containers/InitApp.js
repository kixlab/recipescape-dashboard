import { connect } from 'react-redux'
import { initActiveClusters} from '../actions'
import { App } from '../components/App'


const mapDispatchToProps = (dispatch) => ({
  initActiveClusters: (activeClusters) => dispatch(initActiveClusters(activeClusters))
})

const InitApp = connect(
  null,
  mapDispatchToProps
)(App)

export default InitApp