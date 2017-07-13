import React from 'react'


class ClusterSquare extends React.Component {
    render(){

    console.log(this.props.color)
        return (
            <div className={"ClusterSquare"}>
                <input type={"checkbox"}/>
            </div>
        );
    }
}

export class ClusterSelection extends React.Component {
    render(){
        let style={
            width: "220",
            height: "200",
            border: "1px solid black",
            
        }
        return (
            <div>
                <h2>Clusters</h2>
                <div>
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
            <div>
                <h2>Calculate distance using : </h2>
                <ClusterMethods name={"instructions"}/>
                <ClusterMethods name={"ingredients"}/>
            </div>
        );
    }
}


class ClusterMethods extends React.Component {
    render(){
        return (
            <div>
                <input type={"checkbox"}/>
                <label>{this.props.name}</label>
            </div>
        );
    }
}