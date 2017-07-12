import React, { Component } from 'react';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from '../constants/actionTypes'
import './App.css';
import { StatisticsDeck } from "./charts/statisticsBar"

const mapStateToProps = state => ({
  number: state.counter,
});

const mapDispatchToProps = dispatch => ({
  increase: () => dispatch({type: INCREMENT}),
  decrease: () => dispatch({type: DECREMENT})
})

class App extends Component {
  constructor() {
    super()
    this.increase = () => this.props.increase()
    this.decrease = () => this.props.decrease()
  }

  render() {
    const { number } = this.props;
    return (
      <div>
        <StatisticsDeck stats={STATISTICS}/>
      </div>
    );
  }
}

  var STATISTICS = [{
      mostUsed: ["Flour", "Eggs", "Sugar"],
      leastUsed: ["Strawberries", "White chocolate", "Coconut Oil"]
    },
    {
      mostUsed: ["Mix", "Bake", "Cool"],
      leastUsed: ["Blache", "Boil", "Flamble"]
    }
  ];
 

export default connect(mapStateToProps, mapDispatchToProps)(App);
