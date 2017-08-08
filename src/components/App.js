import React, { Component } from 'react';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from '../constants/actionTypes'
import './App.css';
import { StatRow } from "./statisticsField"
import { BigRecipeMapContainer } from "./recipeMap"
import { RecipeDeck } from "./recipeDeck"
import { Grid } from 'semantic-ui-react'


const mapStateToProps = state => ({
  number: state.counter,
});

const mapDispatchToProps = dispatch => ({
  increase: () => dispatch({type: INCREMENT}),
  decrease: () => dispatch({type: DECREMENT})
});

class App extends Component {
  constructor() {
    super()
    this.increase = () => this.props.increase()
    this.decrease = () => this.props.decrease()
  }

  render() {
    const { number } = this.props;
    return (
      <div style={{padding: 10}}>
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <BigRecipeMapContainer clusters={CLUSTERS}/>
          </Grid.Column>
          <Grid.Column>
            <StatRow  {...INGREDIENTSTATS} labels={LABELS}/>
          </Grid.Column>
        </Grid.Row>
          <RecipeDeck recipes={RECIPES} data={treeData}/>
      </Grid>
      </div>
    );
  }
}

 var LABELS =[ "kids birthday", "fun", "spicy food", "tasty looking"]

  // var STATISTICS = [{
  //     type: "ingredients",
  //     mostUsed: ["Flour", "Eggs", "Sugar"],
  //     leastUsed: ["Strawberries", "White chocolate", "Coconut Oil"]
  //   },
  //   {
  //     type: "instructions",
  //     mostUsed: ["Mix", "Bake", "Cool"],
  //     leastUsed: ["Blache", "Boil", "Flamble"]
  //   },
  //   {
  //     type: "combined",
  //     mostUsed: ["Mix", "Bake", "Cool"],
  //     leastUsed: ["Blache", "Boil", "Flamble"]
  //   }
  // ];

  var CLUSTERS = [
    {color: "blue", key:"1"},
    {color: "yellow", key:"2"},
    {color: "red", key:"3"},
    {color: "brown", key:"4"},
    {color: "green", key:"5"},
    {color: "pink", key:"6"},
    {color: "violet", key:"7"},
    {color: "orange", key:"8"},
]

 var RECIPES = [
   {recipeName: "very tasty pizza", color:"blue", key:"1", ingredients:["sugar", "spice", "more", "than", "can"], instructions:["wisk a and b", "this", "should not", "show"],image:"data:image/jpeg;base64,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"},
   {recipeName: "very tasty cake",color:"red", key:"2", ingredients:["everything"," nice", "comes", "to", "an", "end", "overflow"], instructions:["wisk a and b and add it to a bowl", "but what if there are longer, liek a lot lot lot lot longer", "descriptions, like this for example, how many lines can this be, it couldb eb very long this", "will it ever overflow if teh description is too longshould, sinc ethe description length can vary a lot"]},
   {recipeName: "very tasty cake",color:"orange", key:"3", ingredients:["everything"," nice", "comes", "to", "an", "end", "overflow"], instructions:["wisk a and b", "but", "this", "should"]},
   {recipeName: "very tasty cake 2",color:"yellow", key:"r4", ingredients:["everything"," nice", "comes", "to", "an", "end", "overflow"], instructions:["wisk a and b", "but", "this", "should"]},
   {recipeName: "very tasty cake",color:"purple", key:"r5", ingredients:["everything"," nice", "comes", "to", "an", "end", "overflow"], instructions:["wisk a and b", "but", "this", "should"]},
   {recipeName: "very tasty cake",color:"orange", key:"r6", ingredients:["everything"," nice", "comes", "to", "an", "end", "overflow"], instructions:["wisk a and b", "but", "this", "should"]},
   {recipeName: "very tasty cake 2",color:"brown", key:"r7", ingredients:["everything"," nice", "comes", "to", "an", "end", "overflow"], instructions:["wisk a and b", "but", "this", "should"]},
 ]

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


export default connect(mapStateToProps, mapDispatchToProps)(App);