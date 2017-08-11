import React from 'react'
import { ClusterSelection, GroupByControls } from "./clusterField"
import {Clusters} from "./charts/Cluster"
import { Grid, Divider } from 'semantic-ui-react'
import {UnionGraph} from './charts/unionGraph'

export class BigRecipeMapContainer extends React.Component {
    
    render(){

        //generate data to show off
        let generateNumber = (x,y, ox, oy) => {
            let data = [];
            for (var i = 0; i < 200; i++) {
                data.push({pos:[Math.random()*x+ox, Math.random()*y+oy], id:i}
                );
            }
            return data;
        }

        var CLUSTER1 = {
            r: 5,
            color: "red",
            points: generateNumber(200, 200, 20, 100)
        }

        var CLUSTER2 = {
            r: 5,
            color: "blue",
            points: generateNumber(300, 300, 300, 100)
        }

        var DATA = [CLUSTER1, CLUSTER2];
       return( 

       <div className={"RecipeMap"}>
            <h2 type={"display3"}>RecipeMap</h2>
            <Grid celled>
                <Grid.Column>
                <Clusters clusters={this.props.clusters} height={450} width={700}/>
                <Divider fitted/>
                <GroupByControls/>
                <ClusterSelection clusters={this.props.clusters}/>
                </Grid.Column>
            </Grid>
        </div>
       );
    }
}

