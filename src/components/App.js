import React, { Component } from "react";
import "./App.css";
import RecipeAnalysis from "../containers/RecipeAnalysis";
import { BigRecipeMapContainer } from "./BigRecipeMapContainer";
import InteractiveRecipeDeck from "../containers/InteractiveRecipeDeck";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import initialize from "../actions/init";

export class App extends Component {
  clusters = {};
  clusterName = "dummy";
  state = { loading: true };

  componentDidMount() {
    initialize(this.props.dishname).then(d => {
      let name = this.props.dishname + "_" + this.props.clusterRule;
      let clusters = { points: d[name].points, centers: d[name].centers };
      this.props.initActiveClusters(d[name].buttons);
      this.props.setClusters(clusters);
      this.setState({ loading: false, clusters: d });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clusterRule !== nextProps.clusterRule) {
      let name = this.props.dishname + "_" + nextProps.clusterRule;
      let d = this.state.clusters;
      let clusters = { points: d[name].points, centers: d[name].centers };

      this.props.setClusters(clusters);
      this.props.initActiveClusters(this.state.clusters[name].buttons);
    }

    if (this.props.dishname !== nextProps.dishname) {
      console.log("change recipe");
      this.setState({ loading: true });

      initialize(nextProps.dishname).then(d => {
        let name = nextProps.dishname + "_" + this.props.clusterRule;
        let clusters = { points: d[name].points, centers: d[name].centers };
        this.props.initActiveClusters(d[name].buttons);
        this.props.setClusters(clusters);
        this.setState({ loading: false, clusters: d });
      });
      //     let d = this.state.clusters
      //     let clusters = {points: d[name].points , centers: d[name].centers};
      //     this.props.setClusters(clusters)
      //     this.props.initActiveClusters(this.state.clusters[name].buttons)
      // //     let name = nextProps.dishname+"_"+nextProps.clusterRule
      //     this.setState({clusterName: nextProps.dishname+"_"+nextProps.clusterRule})
      //     // this.clusters = this.state.clusters[name].points;
      //     // this.props.initActiveClusters(this.state.clusters[name].buttons)
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Dimmer active inverted>
            <Loader size="large">Loading recipes for you</Loader>
          </Dimmer>
        ) : (
          <Grid container columns={2} verticalAlign={"top"}>
            <Grid.Row>
              <Grid.Column computer={5}>
                <BigRecipeMapContainer
                  name={this.props.dishname}
                  changeDishname={this.props.changeDishname}
                />
              </Grid.Column>
              <Grid.Column computer={11}>
                <InteractiveRecipeDeck />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={16}>
                <RecipeAnalysis />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

export default App;
