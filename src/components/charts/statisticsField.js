import React from 'react'

//handles singular element
class StatElement extends React.Component {
  render() {
    return (
      <td>{this.props.element}</td>
    );
  }
}

//handles most used / least used pair
class StatDuo extends React.Component {
  render(){
    return (<tr>
      <StatElement element={this.props.mostUsed}/>
      <StatElement element={this.props.leastUsed} />
    </tr>);
  }
}

//handles table content for singular card
class StatRow extends React.Component {
  render() {

    let mostUsed = this.props.statistics.mostUsed,
       leastUsed = this.props.statistics.leastUsed;

    var rows = [];
    //Check that datastructure is as expected
    if(mostUsed.length !== leastUsed.length) throw new Error("Unequal Length ERROR");
    for(let i = 0; i < mostUsed.length; i++){
        rows.push(<StatDuo mostUsed={mostUsed[i]} leastUsed={leastUsed[i]} key={mostUsed[i]+leastUsed[i]} />);
    }    
    
    return (
        <tbody>
            {rows}
        </tbody>
    );
  }
}

//handles singular card
class StatCard extends React.Component {
  render() {

    return (
      <div style={{paddingLeft:"20px"}}>
        <h3>{this.props.statistics.type}</h3>
        <div className={"StatCard"}>
        <table>
          <thead >
            <tr>
              <th>Most Used</th>
              <th>Least Used</th>
            </tr>
          </thead>
          <StatRow statistics={this.props.statistics}/>
        </table>
        </div>
      </div>
    );
  }
}

//Created 3 cards
export class StatisticsDeck extends React.Component {
  render() {
    return (
      <div className={"StatDeck"}>
        <h2>Statistics</h2>
        <div className={"sub"}>
          {this.props.statistics.map((element, index) => <StatCard statistics={element} key={index}/>)}
        </div>
      </div>
    );
  }
}
