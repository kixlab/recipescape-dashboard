import React from 'react'
import { ClusterSelection, ClusterControls } from "./clusterField"
import { Map } from "./map"

export class BigRecipeMapContainer extends React.Component {

    render(){
       return( 
       <div style={{float: "left"}}>
            <h1>RecipeMap</h1>
                <Map/>
                <ClusterControls/>
                <ClusterSelection clusters={this.props.clusters}/>
        </div>
       );
    }
}