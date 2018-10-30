import { connect } from "react-redux";
import { SaveInput } from "../components/SaveInput";
import { saveClusters } from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  saveDeck: name => dispatch(saveClusters(name))
});

const InteractiveSaveClusters = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveInput);

export default InteractiveSaveClusters;
