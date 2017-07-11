import React, { Component } from 'react';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from '../constants/actionTypes'

import './App.css';

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
        <h2>{number}</h2>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
