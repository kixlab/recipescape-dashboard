import React from 'react'
import { Icon, Popup, Loader, Grid, Item, Message} from 'semantic-ui-react'
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

  componentDidMount() {
    this.props.histogram.then(d=>
      {
        this.setState({histograms: d})
        this.setState({loading: false})
      
    })
  }

  componentWillReceiveProps(nextProps){
    if (this.props.histogram != nextProps.histogram) {
      this.setState({ loading: true })
      nextProps.histogram.then(d => {
        this.setState({ histograms: d }
        )
        this.setState({loading: false})
      })
    }
  }

  render(){

    return (
      <div>
        <h2>
          Recipe Analysis
          <Popup
            trigger={<Icon color="grey" size="tiny" name="question circle" />}
            content="Shows you when ingredients or actions are added in the cooking process"
          />
        </h2>
        <div className={"RecipeMap"}>
              {this.state.loading?
            <Message>
              <Loader active size='medium' inline='centered'>Loading</Loader>
            </Message>
              :
            <Grid container columns={'equal'} celled>
              <TableHeader />
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  <div className={"Stats"}>
                    <Item.Group divided>
                      {this.state.histograms.actions.map((methodCard, index) => <InteractiveGraphCard {...methodCard} key={this.props.colors+index} colors={this.props.colors} />)}
                    </Item.Group>
                  </div>

                </Grid.Column>
                <Grid.Column>
                  <div className={"Stats"}>
                    <Item.Group divided>
                      {this.state.histograms.ingredients.map((ingredientCard, index) => <InteractiveGraphCard {...ingredientCard} key={this.props.colors+index} colors={this.props.colors} />)}
                    </Item.Group>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        }
        </div>
      </div>
    );
  }
}
