import { connect } from 'react-redux'
import { changeClusterRule} from '../actions'
import { GroupByControls } from '../components/clusterField'



const mapDispatchToProps = (dispatch) => ({
  groupByIngredients: () => dispatch(changeClusterRule('ingredient')),
  groupByStructure: () => dispatch(changeClusterRule('tree')),

})

const InteractiveGroupByControls = connect(
  null,
  mapDispatchToProps
)(GroupByControls)

export default InteractiveGroupByControls