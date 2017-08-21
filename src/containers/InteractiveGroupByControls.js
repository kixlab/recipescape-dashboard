import { connect } from 'react-redux'
import { changeClusterRule} from '../actions'
import { GroupByControls } from '../components/clusterField'



const mapDispatchToProps = (dispatch) => ({
  groupByIngredients: () => dispatch(changeClusterRule('ingredients')),
  groupByInstructions: () => dispatch(changeClusterRule('actions')),
  groupByDefault: () => dispatch(changeClusterRule('default'))

})

const InteractiveGroupByControls = connect(
  null,
  mapDispatchToProps
)(GroupByControls)

export default InteractiveGroupByControls