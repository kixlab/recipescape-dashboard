import React from 'react'
import { LabelField } from "./labeled"
import Plot from "./GraphPlot"


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
      <div className={"GraphCard"}>
        <div className={"card-container"}>
         <div className={"float"}>
          <table>
            <tbody>
              {this.props.top3.map((ingredient, index) => <IngredientButton ingredient={ingredient} key={index}/>)}
            </tbody>
          </table>
        </div>
        <h4>{this.props.name}</h4>
           <Plot data={this.props.data} width={180} height={60}/>
           <table >
             <tbody><tr><td>begining</td><td>middle</td><td>end of recipe</td></tr></tbody>
           </table>
        </div>
      </div>
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
        <h2>Statistics</h2>
        <div className={"subDeck"}>
          <table>
            <thead>
              <tr>
              <th><HeaderCard title={"Method Adding Time : "}/></th><th><HeaderCard title={"Ingredient Adding Time : "}/></th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>{this.props.methodStats.map((methodCard, index)=> <GraphCard {...methodCard} key={index}/>)} </td>
              <td>{this.props.ingredientStats.map((ingredientCard, index) => <GraphCard {...ingredientCard} key={index}/>)}</td>
            </tr>
            </tbody>
          </table>
    
        </div>
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