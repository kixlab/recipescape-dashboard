import {connect} from 'react-redux'
import {StatRow} from '../components/statisticsField'
import { addSavedDeck } from '../actions'

const mapStateToProps = (state) => ({
    histogram: state.clusters.Histogram,
 });
 
 const mapDispatchToProps = (dispatch) => ({
     
   });
   
   const RecipeAnalysis = connect(
       mapStateToProps,
       mapDispatchToProps,
   )(StatRow)
   
   export default RecipeAnalysis;