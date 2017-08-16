import { TOGGLE_CLUSTER, INIT_ACTIVE_CLUSTERS, SELECT_ALL, UNSELECT_ALL, SAVE_CLUSTER_DECK,LOAD_CLUSTER_DECK } from '../constants/actionTypes'
import {ClusterBaseState} from './BaseState'

const clusters = (state = ClusterBaseState, action) => {
    console.log(state)
    switch(action.type){
        case TOGGLE_CLUSTER: 
            return Object.assign({}, state, {ActiveClusters : state.ActiveClusters.map((e, i) => i==action.clusterID? !e: e)})
        case SELECT_ALL:
            return Object.assign({}, state, {ActiveClusters : state.ActiveClusters.map((e) => true)})
        case UNSELECT_ALL:
            return Object.assign({}, state, {ActiveClusters : state.ActiveClusters.map((e) => false)})
        case INIT_ACTIVE_CLUSTERS:
            return Object.assign({}, state, {ActiveClusters : action.activeClusters})
        case SAVE_CLUSTER_DECK:
            console.log('was here')
            return Object.assign({}, state, {SavedClusters: [...state.SavedClusters, { name: action.name, clusters: state.ActiveClusters}]})
        case LOAD_CLUSTER_DECK:
            let loadedClusters = state.SavedClusters.find((deck) => deck.name == action.name)
            if (loadedClusters) return  Object.assign({}, state, {ActiveClusters: loadedClusters.clusters});
        default:
      return state
  }
}

export default clusters;