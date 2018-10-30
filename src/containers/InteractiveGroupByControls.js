import { connect } from "react-redux";
import { changeClusterRule } from "../actions";
import { ClusterModeDropdown } from "../components/ClusterModeSelector";

const mapDispatchToProps = dispatch => ({
  groupByIngredients: () => dispatch(changeClusterRule("ingredient")),
  groupByStructure: () => dispatch(changeClusterRule("tree"))
});

const InteractiveGroupByControls = connect(
  null,
  mapDispatchToProps
)(ClusterModeDropdown);

export default InteractiveGroupByControls;
