import React from 'react'
// import { LabelField } from "./labeled"
import Plot from "./charts/GraphPlot"
import { Card, Icon, Table,  Label, List, Popup, Loader, Grid, Item} from 'semantic-ui-react'
import TopThreeClickable from '../containers/TopThreeClickable'
import InteractiveGraphCard from '../containers/InteractiveGraphCard'



const TableHeader = () => (
  <Grid.Row>
      <Grid.Column>Time when cooking action is used : </Grid.Column>
      <Grid.Column>Time when ingredient is used: </Grid.Column>
  </Grid.Row>
);

export class StatRow extends React.Component {

  state = {loading: true}
  histograms = {}

  constructor(){
    super();
  }

  componentDidMount() {
    this.props.histogram.then(d=>
      {
        this.setState({histograms: d})
        this.setState({loading: false})
      
    })
  }

  render(){
    console.log(this.state.histograms)
    return (
      <div>
        <h2>
          Recipe Analysis
          <Popup
            trigger={<Icon color="grey" size="tiny" name="question circle" />}
            content="Shows you when ingredients or actions are added in the cooking process"
          />
        </h2>
              {this.state.loading?
                <Loader active size='large'>Loading</Loader>
              :
              <div className={"RecipeMap"}>
              <Grid container columns={'equal'}  celled>
          <TableHeader />
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  <div className={"Stats"}>
                  <Item.Group divided>
                    {this.state.histograms.actions.map((methodCard, index) => <InteractiveGraphCard {...methodCard} key={index} colors={this.props.colors}/>)}
                  </Item.Group>
                  </div>
                  
                </Grid.Column>
                <Grid.Column>
                  <div className={"Stats"}>
                    <Item.Group divided>
                    {this.state.histograms.ingredients.map((ingredientCard, index) => <InteractiveGraphCard {...ingredientCard} key={index} colors={this.props.colors}/>)}
                    </Item.Group>
                  </div>
                </Grid.Column>
              </Grid.Row>
        </Grid>
        </div>
        }
      </div>
    );
  }
}
