import React from 'react'
import {SaveInput} from './SaveInput'
import { Label, Button, List, Divider, Dropdown, Segment, Icon } from 'semantic-ui-react'
import {numbertocolor} from './charts/svgColorTranslation'
import AllOrNothingButtons from '../containers/AllOrNothingButtons'
import InteractiveSaveClusters from '../containers/InteractiveSaveClusters'
import ClusterDropdown from '../containers/ClusterDropdown'

const ClusterSquare = ({color, selected, onClick}) =>{
    let icon= selected ? 'checkmark': ''
    return(
    <List.Item style={{cursor: 'pointer'}}>
            <Icon circular color={color} inverted name={icon} onClick={onClick}/>
    </List.Item>

    )};

export class ClusterSelection extends React.Component {

    render(){
        return (
            <div className={"ClusterSelection"}>
            <Segment vertical>
                <AllOrNothingButtons />
                <Divider hidden fitted/>
                <List horizontal>
                      {this.props.clusters.map((checked, index) => <ClusterSquare color={numbertocolor[index]}selected={checked} key={index}  onClick={() => this.props.onClick(index)}/>)}  
                </List>
                <Divider hidden fitted/>
                <SaveClusters />
            </Segment>
            </div>
        );
    }
}

class SaveClusters extends React.Component {
    state = { open: false }
    show =  () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render(){
        return (
            <List horizontal>
                <List.Item><Button size='small' basic onClick={this.show}>save selected clusters</Button></List.Item>
                <InteractiveSaveClusters open={this.state.open} close={this.close} text={"Save selected clusters"} />
                <List.Item><ClusterDropdown /></List.Item>
            </List>
        );
    }
}

export class GroupByControls extends React.Component {
    render(){
        return (
            <Segment vertical>
                <List horizontal>
                    <List.Item><List.Header>Group by: </List.Header></List.Item>
                    <List.Item><Button size='small' toggle basic>Ingredients</Button></List.Item>
                    <List.Item><Button size='small' toggle basic>Instructions</Button></List.Item>
                </List>
            </Segment>
        );
    }
}

