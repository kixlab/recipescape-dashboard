import { TOGGLE_CLUSTER, INIT_ACTIVE_CLUSTERS, SELECT_ALL, UNSELECT_ALL, SAVE_CLUSTER_DECK,LOAD_CLUSTER_DECK,CHANGE_CLUSTER_RULE,INGREDIENT_INSTRUCTION_COMBO, DELETE_HIGHLIGHT, SET_HIGHLIGHT} from '../constants/actionTypes'
import {ClusterBaseState} from './BaseState'
import axios from 'axios'

const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"

const clusters = (state = ClusterBaseState, action) => {
    console.log(state)
    switch(action.type){
        case TOGGLE_CLUSTER:
            let activeClusters =  state.ActiveClusters.map((e, i) => i==action.clusterID? !e: e)
            return Object.assign({}, state, {ActiveClusters : activeClusters}, {Histogram: setHistogram(state, activeClusters)})
        case SELECT_ALL:
            activeClusters =  state.ActiveClusters.map((e) => true)
            return Object.assign({}, state, {ActiveClusters : activeClusters}, {Histogram: setHistogram(state, activeClusters)})
        case UNSELECT_ALL:
            return Object.assign({}, state, {ActiveClusters : state.ActiveClusters.map((e) => false)})
        case INIT_ACTIVE_CLUSTERS:
            return Object.assign({}, state, {ActiveClusters : action.activeClusters}, {Histogram: setHistogram(state, action.activeClusters)})
        case SAVE_CLUSTER_DECK:
            return Object.assign({}, state, {SavedClusters: [...state.SavedClusters, { name: action.name, clusters: state.ActiveCluster, ClusterRule: state.ClusterRule}]})
        case LOAD_CLUSTER_DECK:
            let loadedClusters = state.SavedClusters.find((deck) => deck.name == action.name)
            if (loadedClusters) return  Object.assign({}, state, {ActiveClusters: loadedClusters.clusters},{ClusterRule: loadedClusters.ClusterRule}, {Histogram: setHistogram(state, loadedClusters.clusters)});     
        case CHANGE_CLUSTER_RULE:
            return Object.assign({}, state, {ClusterRule: action.clusterRule});
        case INGREDIENT_INSTRUCTION_COMBO:
            if(!action.source) {
                if(state.IngredientCombos.find( d=> d.action == action.ingredient_action.action && d.ingredient == action.ingredient_action.ingredient)){
                    return Object.assign({}, state, {IngredientCombos: state.IngredientCombos.filter(e => e.ingredient != action.ingredient_action.ingredient)});

                } else return Object.assign({}, state, {IngredientCombos: [ action.ingredient_action, ...state.IngredientCombos.filter(e => e.ingredient != action.ingredient_action.ingredient)]});
            } else if(state.InstructionCombos.find( d=> d.action == action.ingredient_action.action && d.ingredient == action.ingredient_action.ingredient)){
                return Object.assign({}, state, {InstructionCombos: state.InstructionCombos.filter(e => e.action != action.ingredient_action.action)});
            } else return Object.assign({}, state, {InstructionCombos: [ action.ingredient_action ,...state.InstructionCombos.filter(e => e.action != action.ingredient_action.action)]});
        case DELETE_HIGHLIGHT:
            return Object.assign({}, state, {highlights: []})
        case SET_HIGHLIGHT:
            return Object.assign({}, state, {highlights: action.recipes})
        default:
      return state
  }
}



function setHistogram(state, activeClusters){
    let selected = [];
    activeClusters.forEach((d,i) => {if(d) selected.push(i)})
    return getHistogram(state.RecipeName, {cluster_name: state.ClusterRule, selected_clusters: selected})
}



async function getHistogram(dishname, data) {
    const hist_resp = await axios.post(BASE_URL + `histograms/${dishname}`, data)
    .then(resp => resp.data)
    return hist_resp
}

export default clusters;