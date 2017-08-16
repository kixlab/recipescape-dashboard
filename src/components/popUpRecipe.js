import React from 'react'
import {Modal, Button, Header, Grid, List, Label} from 'semantic-ui-react'
import {Tree} from './charts/Tree'


export const Instructions = ({instructions})=> {
    return(
        <List ordered>
            {instructions.map((element, index) => <List.Item key={index}>{element}</List.Item>)}
        </List>
    );
}

export class PopupRecipe extends React.Component {

    render(){
        return(
            <Modal dimmer={false} open={this.props.open} onClose={this.props.close}>
                <Modal.Header>{this.props.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header>Recipe View</Header>
                                    <Header size="small">Ingredients</Header>
                                    <Label.Group>
                                        {this.props.ingredients.map((ingredient, index) => <Label basic key={index}><Label.Detail>{ingredient}</Label.Detail></Label>)}
                                    </Label.Group>
                                    <Header size="small">Instructions</Header>
                                    <Instructions instructions={this.props.sentences}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header>Tree View</Header>
                                    <Tree data={this.props.trees} height={600} width={300}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.close}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>

        );
    }

}