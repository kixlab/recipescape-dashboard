import { connect } from "react-redux";
import { initActiveClusters, saveAll, changeRecipe } from "../actions";
import { App } from "../components/App";

const mapStateToProps = state => ({
  dishname: state.clusters.RecipeName,
  clusterRule: state.clusters.ClusterRule,
  clusters: {
    points: state.recipeDeck.points,
    centers: state.recipeDeck.centers
  }
});

const mapDispatchToProps = dispatch => ({
  initActiveClusters: activeClusters =>
    dispatch(initActiveClusters(activeClusters)),
  setClusters: clusters => dispatch(saveAll(clusters)),
  changeDishname: name => dispatch(changeRecipe(name))
});

const InitApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default InitApp;
