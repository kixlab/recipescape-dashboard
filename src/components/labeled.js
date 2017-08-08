import React from 'react'


class Label extends React.Component {
    render(){
        return(
            <div className={"Label"}>
                <p>{this.props.label}</p>
            </div>
        );
    }
}

class LabelBox extends React.Component {
    render(){
        return(
            <div className={"LabelBox"}>
                {this.props.labels.map(label => <Label key={label} label={label}/>)}
            </div>
        );
    }
}

export class LabelField extends React.Component {
    render(){
        return(
            <div>
                <h2>Labeled Collections</h2>
                <LabelBox labels={this.props.labels}/>
            </div>
        );
    }
}
