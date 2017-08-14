import { SELECT_CLUSTER, UNSELECT_CLUSTER } from '../constants/actionTypes'
import {ClusterBaseState} from './BaseState'

const clusters = (state = ClusterBaseState, action) => {
    switch(action.type){
        case SELECT_CLUSTER: 
            if(state.clusters) //check initial case
                return Object.assign({}, state, {clusters: [action.clusterID, ...state.clusters]})
            return Object.assign({}, state, {clusters: [action.clusterID]})
        case UNSELECT_CLUSTER:
            return state.clusters.filter((id) => id != action.clusterID)
        default:
      return state
  }
}

export default clusters;