import React from 'react'
import { ClusterSelection, ClusterControls } from "./clusterField"
import {Clusters} from "./charts/Cluster"
import { Grid, Divider } from 'semantic-ui-react'

export class BigRecipeMapContainer extends React.Component {
    
    render(){

        //generate data to show off
        let generateNumber = () => {
            let data = [];
            for (var i = 0; i < 100; i++) {
                data.push({pos:[Math.random()*700+1, Math.random()*400+1], id:i}
                );
            }
            return data;
        }

        var CLUSTER1 = {
            r: 5,
            color: "yellow",
            points: generateNumber()
        }

        var CLUSTER2 = {
            r: 5,
            color: "orange",
            points: generateNumber()
        }

        var DATA = [CLUSTER1, CLUSTER2];
       return( 

       <div className={"RecipeMap"}>
            <h2 type={"display3"}>RecipeMap</h2>
            <Grid celled>
                <Grid.Column>
                <Clusters data={DATA} height={450} width={700}/>
                <Divider fitted/>
                <ClusterControls/>
                <ClusterSelection clusters={this.props.clusters}/>
                </Grid.Column>
            </Grid>
        </div>
       );
    }
}

