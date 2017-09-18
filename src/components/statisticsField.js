import React from 'react'
import { Icon, Popup, Loader, Grid, Item, Message, Table} from 'semantic-ui-react'
import InteractiveGraphCard from '../containers/InteractiveGraphCard'


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
        <h3>
          Recipe Stats
          <Popup
            trigger={<Icon color="grey" size="tiny" name="question circle" />}
            content="Shows you when ingredients or actions are added in the cooking process"
          />
        </h3>
        <div className={"RecipeMap"}>
              {this.state.loading?
            <Message>
              <Loader active size='medium' inline='centered'>Loading</Loader>
            </Message>
              :
            <Grid container columns={'equal'} celled>
              <Grid.Row verticalAlign='top'>
                  <div className={"Stats"}>
                    <Table celled>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.Row>
                      {this.state.histograms.actions.map((methodCard, index) =>
                      <Table.Cell>
                      <InteractiveGraphCard style={{display: 'float-left'}} {...methodCard} key={this.props.colors+index} colors={this.props.colors} />
                      </Table.Cell>
                      )}
                    </Table.Row>
                    </Table>
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <div className={"Stats"}>
                  <Table celled>
                  <Table.HeaderCell>Ingredients</Table.HeaderCell>
                    <Table.Row>
                      {this.state.histograms.ingredients.map((ingredientCard, index) =>
                        <Table.Cell>
                      <InteractiveGraphCard {...ingredientCard} key={this.props.colors+index} colors={this.props.colors} />
                      </Table.Cell>
                      )}
                      </Table.Row>
                    </Table>
                  </div>
              </Grid.Row>
            </Grid>
        }
        </div>
      </div>
    );
  }
}
