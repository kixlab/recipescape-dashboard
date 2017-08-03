import React from 'react'
import { LabelField } from "./labeled"
import Plot from "./charts/GraphPlot"
import { Card, Icon, Image, Grid,Table, Segment, Label, List, Button, Popup} from 'semantic-ui-react'

const IngredientButton = ({ingredient}) => {
  return (
    <tr>
      <td>
        <button className={"mdc-button mdc-button--dense mdc-button--compact	"}>{ingredient}</button></td>
    </tr>
  );
};

class GraphCard extends React.Component {
  render(){
    return(      
      <Card>
        <Card.Content>
          <List horizontal><List.Item>{this.props.name}</List.Item>
            <List.Item>
              <Label>mix</Label>
            </List.Item>
            <List.Item>
              <Label>stir</Label>
            </List.Item>
            <List.Item>
              <Label>boil</Label>
            </List.Item>
          </List>
          </Card.Content>
          <Card.Content>
           <Plot data={this.props.data} width={250} height={100}/>

          </Card.Content>
      </Card>
    );
  }
}


// DESCRIBE CARDS
const HeaderCard = ({title}) => {
  return(
      <h3>{title}</h3>
  );
}

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

        <Table basic celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><HeaderCard title={"When is ingredient is added?"}/></Table.HeaderCell>
              <Table.HeaderCell><HeaderCard title={"Ingredient Adding Time : "}/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
              <Table.Row verticalAlign='top' padded>
                <Table.Cell padded>
                  <div className={"Stats"}>
              {this.props.methodStats.map((methodCard, index)=> <GraphCard {...methodCard} key={index}/>)}
              </div>
              </Table.Cell>
              <Table.Cell>
                <div className={"Stats"}>
              {this.props.ingredientStats.map((ingredientCard, index) => <GraphCard {...ingredientCard} key={index}/>)}
              </div>
              </Table.Cell>
              </Table.Row>
            </Table.Body>
        </Table>
      </div>
    );
  }
}




/** Code For Statostocs*/

//Created 3 cards
class StatisticsDeck extends React.Component {
  render() {
    return (
      <div>
        <h2>Statistics</h2>
        <div className={"sub"}>
           {/* {this.props.statistics.map((element, index) => <StatCard statistics={element} key={index}/>)}  */}
        </div>
      </div>
    );
  }
}