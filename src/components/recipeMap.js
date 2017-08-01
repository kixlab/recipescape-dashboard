import React from 'react'
import { ClusterSelection, ClusterControls } from "./clusterField"
import {Clusters} from "./charts/Cluster"
import { Grid, Divider } from 'semantic-ui-react'

export class BigRecipeMapContainer extends React.Component {
    
    render(){
        var CLUSTER = {
            r: 5,
            color: "red",
            points: [
                {pos: [300, 300], id: 12},
                {pos: [60, 50], id: 13},
                {pos: [30, 60], id: 14}
            ]
        }

        var DATA = [CLUSTER];
       return( 
       <div className={"RecipeMap"}>
            <h2 type={"display3"}>RecipeMap</h2>
            <Grid celled>
                <Grid.Column>
                <Clusters data={DATA} height={550} width={550}/>
                <Divider fitted/>
                <ClusterControls/>
                <ClusterSelection clusters={this.props.clusters}/>
                </Grid.Column>
            </Grid>
        </div>
       );
    }
}

