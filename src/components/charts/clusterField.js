import React from 'react'


class ClusterSquare extends React.Component {
    render(){
        return (

            <div className="mdc-checkbox">
            <input type="checkbox"
                    className="mdc-checkbox__native-control"/>
            <div className="mdc-checkbox__background" style={{
                backgroundColor:this.props.color,
                borderColor: this.props.color,
                 }}>
                <svg className="mdc-checkbox__checkmark"
                    viewBox="0 0 24 24">
                 <path 
                        className="mdc-checkbox__checkmark__path" 
                        fill="none"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                </svg>
                <div className="mdc-checkbox__mixedmark"></div>
            </div>
            </div>
            
        );
    }
}

export class ClusterSelection extends React.Component {
    render(){
        return (
            <div className={"ClusterSelection"}>
                <h2>Clusters</h2>
                <div className={"ClusterControls"} >
                    {this.props.clusters.map(element => <ClusterSquare color={element.color} key={element.key}/>)}
                </div>
                <div className={"ClusterControls"}>
                    <button className={"mdc-button"}>select all</button>
                    <button className={"mdc-button"}>unselect all</button>
                </div>
            </div>
        );
    }
}

export class ClusterControls extends React.Component {
    render(){
        return (
            <div className={"ClusterSelection"}>
                <h2>Calculate distance using :</h2>
                <button className={"mdc-button"}>ingredients</button>
                <button className={"mdc-button"}>instructions</button>
            </div>
        );
    }
}

