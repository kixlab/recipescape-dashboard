import React from 'react'
// import { LabelField } from "./labeled"
import Plot from "./charts/GraphPlot"
import { Card, Icon, Table,  Label, List, Popup, Loader} from 'semantic-ui-react'


const GraphTop = ({name, topThree}) => {
  return (
  <List horizontal><List.Item>{name}</List.Item>
  {topThree.map((item, i) => <List.Item key={i}><Label>{item}</Label></List.Item>)}
  </List>
)};

class GraphCard extends React.Component {
  render(){
    let name = this.props.action? this.props.action : this.props.ingredient;
    return(      
      <Card>
        <Card.Content>
          <GraphTop topThree={this.props.neighbors} name={name} />
        </Card.Content>
        <Card.Content>
          <Plot data={this.props.histogram} width={250} height={100} />
        </Card.Content>
      </Card>
    );
  }
}

const TableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Instruction is added : </Table.HeaderCell>
      <Table.HeaderCell>Ingredient Adding Time : </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
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
    return (
      <div>
        <h2>
          Recipe Analysis
          <Popup
            trigger={<Icon color="grey" size="tiny" name="question circle" />}
            content="I don't know what to put here"
          />
        </h2>
              {this.state.loading?
                <Loader active size='large'>Loading</Loader>
              :
              <Table basic celled>
          <TableHeader />
          <Table.Body>
              <Table.Row verticalAlign='top'>
                <Table.Cell>
                  <div className={"Stats"}>
                    {this.state.histograms.actions.map((methodCard, index) => <GraphCard {...methodCard} key={index} />)}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className={"Stats"}>
                    {this.state.histograms.ingredients.map((ingredientCard, index) => <GraphCard {...ingredientCard} key={index} />)}
                  </div>
                </Table.Cell>
              </Table.Row>
              </Table.Body>
        </Table>
        }
      </div>
    );
  }
}
