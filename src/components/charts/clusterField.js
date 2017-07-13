import React from 'react'


class ClusterSquare extends React.Component {
    render(){
        var content="";
        if(true) content = "✓";
        return (
            <div style={{ float:"left"}}>
                <div className={"checkbox"} style={{borderColor: this.props.color, color: this.props.color}}>{content}</div>
            </div>
        );
    }
}

export class ClusterSelection extends React.Component {
    render(){
        return (
            <div>
                <h2>Clusters</h2>
                <div className={"ClusterButtons"}>
                    {this.props.clusters.map(element => <ClusterSquare color={element.color} key={element.key}/>)}
                    <div>
                        <button>select all</button>
                        <button>unselect all</button>
                    </div>
                </div>
            </div>
        );
    }
}

export class ClusterControls extends React.Component {
    render(){
        return (
            <div style={{height:"65px"}}>
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
            <div style={{ display:"inline-block"}}>
                <div style={{float:"left",display:"inline-block"}}className={"checkbox"}>{content}</div>
                <p style={{float:"left",display:"inline-block"}}>{this.props.name}</p>
            </div>
        );
    }
}