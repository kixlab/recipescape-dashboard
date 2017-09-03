import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { loadClusters } from '../actions'
import React from 'react'


const mapStateToProps = (state) => ({
    data: state.clusters.SavedClusters.map((object) => { return {key: object.name, text: object.name, value: object.name}})
});

let ClusterDropdown = ({dispatch, data}) => {
    return (
        <Dropdown text='Saved Clusters' pointing floating labeled button basic> 
            <Dropdown.Menu>
                {data.map(el => <Dropdown.Item {...el} onClick={() => dispatch(loadClusters(el.key))}/>)}
            </Dropdown.Menu>
        </Dropdown>
    );
  }

  
  ClusterDropdown = connect(
    mapStateToProps
  )(ClusterDropdown)

  export default ClusterDropdown;