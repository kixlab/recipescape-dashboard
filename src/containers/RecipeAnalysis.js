import {connect} from 'react-redux'
import {StatRow} from '../components/statisticsField'
import {colorArray} from '../components/charts/svgColorTranslation'

const mapStateToProps = (state) => ({
    IngredientCombos: state.clusters.IngredientCombos,
    InstructionCombos: state.clusters.InstructionCombos,
    histogram: state.clusters.Histogram,
    colors: state.clusters.ActiveClusters.map((d,i) => d? colorArray[i]: 0).filter((d) => d!==0)
 });
 
 const mapDispatchToProps = (dispatch) => ({
     
     
   });
   
   const RecipeAnalysis = connect(
       mapStateToProps,
       mapDispatchToProps,
   )(StatRow)
   
   export default RecipeAnalysis;