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

    let mostUsed = this.props.stats.mostUsed,
       leastUsed = this.props.stats.leastUsed;
    var rows = [];
    //Check that datastructure is as expected
    if(mostUsed.length !== leastUsed.length) throw "Unequal Length ERROR";
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
      <div className="card">
      <table>
        <thead>
          <tr>
            <th>Most Used</th>
            <th>Least Used</th>
          </tr>
        </thead>
        <StatRow stats={this.props.stats}/>
      </table>
      </div>
    );
  }
}

//Created 3 cards
export class StatisticsDeck extends React.Component {
  render() {
    return (
      <div>
        {this.props.stats.map((element, index) => <StatCard stats={element} key={index}/>)}
      </div>
    );
  }
}
