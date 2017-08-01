import React from 'react'
import { LabelField } from "./labeled"
import Plot from "./charts/GraphPlot"
import { Card, Icon, Image, Grid,Table } from 'semantic-ui-react'

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
        <Card.Header>{this.props.name}</Card.Header>
        </Card.Content>
        <Card.Content>

           <Plot data={this.props.data} width={180} height={60}/>
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
      <div className={"StatRow"}>
        <h2 type={"display1"} gutterBottom={true}>Statistics</h2>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><HeaderCard title={"Method Adding Time : "}/></Table.HeaderCell>
              <Table.HeaderCell><HeaderCard title={"Ingredient Adding Time : "}/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
              <Table.Row verticalAlign='top'>
                <Table.Cell>
              {this.props.methodStats.map((methodCard, index)=> <GraphCard {...methodCard} key={index}/>)}
              </Table.Cell>
              <Table.Cell>
              {this.props.ingredientStats.map((ingredientCard, index) => <GraphCard {...ingredientCard} key={index}/>)}
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