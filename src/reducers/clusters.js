const clusters = (state = {}, action) => {
    switch(action.type){
        case 'SELECT_CLUSTER': 
            if(state.clusters) //check initial case
                return Object.assign({}, state, {clusters: [action.clusterID, ...state.clusters]})
            return Object.assign({}, state, {clusters: [action.clusterID]})
        case 'UNSELECT_CLUSTER':
            return state.clusters.filter((id) => id != action.clusterID)
        default:
      return state
  }
}