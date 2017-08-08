import React from 'react'
import {SaveInput} from './popupInput'
import { Label, Button, List, Divider, Dropdown, Segment } from 'semantic-ui-react'

const ClusterSquare = ({color}) => (
    <List.Item>
            <Label circular color={color} as={Button}/>
    </List.Item>

        );

export class ClusterSelection extends React.Component {

    render(){
        return (
            <div className={"ClusterSelection"}>
            <Segment vertical>
                <AllOrNothingButtons />
                <Divider hidden fitted/>
                <List horizontal>
                    {this.props.clusters.map(element => <ClusterSquare color={element.color} key={element.key}/>)}
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
        let data =
            [{
                "key": "Kellen Schuppe",
                "text": "Kellen Schuppe",
                "value": "kellen_schuppe"
            },
            {
                "key": "Cassandra Gutmann",
                "text": "Cassandra Gutmann",
                "value": "cassandra_gutmann"
            },
            {
                "key": "Shaina Zulauf IV",
                "text": "Shaina Zulauf IV",
                "value": "shaina_zulauf_iv"
            }];
        return (
            <List horizontal>
                <List.Item><Button basic onClick={this.show}>save selected clusters</Button></List.Item>
                <SaveInput open={this.state.open} close={this.close} text={"Save selected clusters"} />
                <List.Item><Button basic>
                    <Dropdown text='saved clusters' options={data} simple item />
                </Button>
                </List.Item>
            </List>
        );
    }
}

class AllOrNothingButtons extends React.Component {
    render(){
        return(
            <List horizontal>
                <List.Item><List.Header>Clusters : </List.Header></List.Item>
                <List.Item><Button basic>select all</Button></List.Item>
                <List.Item><Button basic>unselect all</Button></List.Item>
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
                    <List.Item><Button toggle basic>Ingredients</Button></List.Item>
                    <List.Item><Button toggle basic>Instructions</Button></List.Item>
                </List>
            </Segment>
        );
    }
}

