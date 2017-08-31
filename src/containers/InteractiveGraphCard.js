import {connect} from 'react-redux'
import GraphCard from '../components/GraphCard'
import axios from 'axios'
const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"

const mapStateToProps = (state, ownProps) => {
    let overlay = ownProps.ingredient? state.clusters.IngredientCombos.find(d => d.ingredient == ownProps.ingredient)
    : state.clusters.InstructionCombos.find(d => d.action == ownProps.action);
    let val = undefined;
    if(overlay) {
        val = getVal(state, ownProps,overlay)
    }

    return ({
        currentOverlay: overlay,
        overlayData: val
     });

}

async function getVal(state, ownProps, overlay){

    const val =await axios.post(BASE_URL + `histogram/${state.clusters.RecipeName}`, 
    {cluster_name: state.clusters.ClusterRule,
    selected_clusters: state.clusters.ActiveClusters.map((d,i) => d? i : -1).filter(d=> d > -1),
    action: overlay.action,
    ingredient: overlay.ingredient
    }).then(resp => resp.data)
    return val
};
 
 const mapDispatchToProps = (dispatch) => ({
     
     
   });
   
   const InteractiveGraphCard = connect(
       mapStateToProps,
       mapDispatchToProps,
   )(GraphCard)
   
   export default InteractiveGraphCard;