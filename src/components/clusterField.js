import React from 'react'
import { Label, Button, List, Divider, Dropdown, Segment } from 'semantic-ui-react'

const ClusterSquare = ({color}) => (
    <List.Item>
            <Label circular color={color} as={Button}/>
    </List.Item>

        );

export class ClusterSelection extends React.Component {
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
            <div className={"ClusterSelection"}>
            <Segment vertical>
                <List horizontal>
                    <List.Item><List.Header>Clusters : </List.Header></List.Item>
                    <List.Item><Button basic>select all</Button></List.Item>
                    <List.Item><Button basic>unselect all</Button></List.Item>
                </List>
                <Divider hidden fitted/>
                <List horizontal>{this.props.clusters.map(element => <ClusterSquare color={element.color} key={element.key}/>)}</List>
                <Divider hidden fitted/>
                <List horizontal>
                    <List.Item><Button basic>save selected clusters</Button></List.Item>
                    <List.Item><Button basic>
                        <Dropdown text='saved clusters' options={data} simple item />
                    </Button>
                    </List.Item>
                </List>
            </Segment>
            </div>
        );
    }
}

export class ClusterControls extends React.Component {
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

