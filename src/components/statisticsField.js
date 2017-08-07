import React from 'react'
import { LabelField } from "./labeled"
import Plot from "./charts/GraphPlot"
import { Card, Icon, Image, Grid,Table, Segment, Label, List, Button, Popup} from 'semantic-ui-react'


const GraphTop = ({name, topThree}) => {
  return (
  <List horizontal><List.Item>{name}</List.Item>
  {topThree.map(item => <List.Item><Label>{item}</Label></List.Item>)}
  </List>
)};

class GraphCard extends React.Component {
  render(){
    return(      
      <Card>
        <Card.Content>
          <GraphTop topThree={this.props.top3} name={this.props.name} />
        </Card.Content>
        <Card.Content>
          <Plot data={this.props.data} width={250} height={100} />
        </Card.Content>
      </Card>
    );
  }
}

const TableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>When is ingredient is added?</Table.HeaderCell>
      <Table.HeaderCell>Ingredient Adding Time : </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export class StatRow extends React.Component {
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
        <Table basic celled>
          <TableHeader />
          <Table.Body>
            <Table.Row verticalAlign='top'>
              <Table.Cell>
                <div className={"Stats"}>
                  {this.props.methodStats.map((methodCard, index) => <GraphCard {...methodCard} key={index} />)}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className={"Stats"}>
                  {this.props.ingredientStats.map((ingredientCard, index) => <GraphCard {...ingredientCard} key={index} />)}
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
