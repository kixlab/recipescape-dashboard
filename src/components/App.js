import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { StatRow } from "./statisticsField"
import { BigRecipeMapContainer } from "./BigRecipeMapContainer"
import InteractiveRecipeDeck from "../containers/InteractiveRecipeDeck"
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import initialize from '../actions/init'


export class App extends Component {
  clusters = {}
  state = {loading: true}

  constructor() {
    super()
  }

  componentDidMount() {
    initialize().then( (d) => {
      this.clusters = d.points;
      this.props.initActiveClusters(d.buttons)
      this.setState({loading: false})
    })
  }

  render() {
    const { number } = this.props;

    return (
      <div >
        {this.state.loading ? 
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
      :
          <Grid columns='equal' container>
            <Grid.Row>
              <Grid.Column>
                <BigRecipeMapContainer clusters={this.clusters} />
              </Grid.Column>
              <Grid.Column>
                <StatRow  {...INGREDIENTSTATS}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <InteractiveRecipeDeck data={treeData} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      }
      </div>
    );
  }
}

 var LABELS =[ "kids birthday", "fun", "spicy food", "tasty looking"]




//RECIPE ANALYSIS
var DATA = [
  {plot: [[12, 13], [14, 40], [15,10],[16, 13], [17, 40], [18,10]], clusterColor: "red" },
  {plot:[[1, 2], [10, 10], [14, 10], [15,3], [16, 2], [17, 10], [18, 10], [20,3]], clusterColor: "blue"}
]

var INGREDIENTSTATS = {
  ingredientStats: [{data: DATA, name:"patato", top3:["mix", "stirr", "oil"]}, {data: DATA, name:"patato", top3:["mix", "stirr", "oil"]}, {data: DATA, name:"patato", top3:["mix", "stirr", "oil"]},{data: DATA, name:"patato", top3:["mix", "stirr", "oil"]}, {data: DATA, name:"patato", top3:["mix", "stirr", "oil"]}],
  methodStats: [{data: DATA, name:"mix", top3:["mix", "stirr", "oil"]}, {data: DATA, name:"boil", top3:["mix", "stirr", "oil"]}, {data: DATA, name:"mix", top3:["mix", "stirr", "oil"]}, {data: DATA, name:"boil", top3:["mix", "stirr", "oil"]}],
}

//FOR COMPARISON
var data = {
    Recipe1 : {ingredients : ["tomato", "pepper", "sugar", "garlic", "olives","of","ingredients"] },
    Intersection: {ingredients : ["salt", "pasta", "beef", "onions", "it", "will", "adapt", "it", "more"]},
    Recipe2 :  {ingredients : ["a", "lot","of","ingredients"]
    },
};


//RECIPE TREE
var treeData =
  {
    "name": "Present nicely",
    "children": [
      {
        "name": "put on top",
        "children": [
          { "name": "basil",},
          {"name": "salt"}
        ]
      },
      {"name": "bake",
        "children":
    [
        { "name": "top",
          "children": [
          { "name": "cheese",},
          {"name": "mix",
        "children" :
        [
          { "name": "flour",},
          {"name": "oil"}
        ]
             }
    ]
            },
          {"name": "tomatos"}
        ]
    }
    ]
  };
export default App;