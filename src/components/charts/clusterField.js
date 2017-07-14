import React from 'react'


class ClusterSquare extends React.Component {
    render(){
        return (
            <div className={"checkbox"} style={{float:"left", height: 16, width:16}}>
                <input id={this.props.color} type={"checkbox"}/>
                <label style={{color: this.props.color, position:"absolute"}} htmlFor={this.props.color}></label>
            </div>
            
        );
    }
}

export class ClusterSelection extends React.Component {
    render(){
        return (
            <div className={"ClusterSelection"}>
                <h2 style={{marginBottom:0}} >Clusters</h2>
                <div className={"ClusterControls"} >
                    {this.props.clusters.map(element => <ClusterSquare color={element.color} key={element.key}/>)}
                </div>
                <div className={"ClusterControls"}>
                    <button>select all</button>
                    <button>unselect all</button>
                </div>
            </div>
        );
    }
}

export class ClusterControls extends React.Component {
    render(){
        return (
            <div className={"ClusterSelection"}>
                <h2 style={{ display:"inline-block"}}>Calculate distance using :</h2>
                <ClusterMethods name={"instructions"}/>
                <ClusterMethods name={"ingredients"}/>
            </div>
        );
    }
}


class ClusterMethods extends React.Component {
    render(){
        var content="";
        if(true) content = "✓";

        return (
            // <button>{this.props.name}</button>
            <div className={"checkbox"}>
                <input id={this.props.name} type={"checkbox"}/>
                <label htmlFor={this.props.name}>{this.props.name}</label>
            </div>
        );
    }
}