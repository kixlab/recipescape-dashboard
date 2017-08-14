import React from 'react'
import {Modal, Button, Header, Grid} from 'semantic-ui-react'
import {UnionGraph} from './charts/unionGraph'
import {VennDiagram} from './charts/vennDiagram'

export class PopupRecipe extends React.Component {
    

    render(){
        let data = {
            Recipe1: { ingredients: ["tomato", "pepper", "sugar", "garlic", "olives", "of", "ingredients"] },
            Intersection: { ingredients: ["salt", "pasta", "beef", "onions", "it", "will", "adapt", "it", "more"] },
            Recipe2: {
                ingredients: ["a", "lot", "of", "ingredients"]
            },
        };
        return(
            <Modal dimmer={false} open={this.props.open} onClose={this.props.close}>
                <Modal.Header>{'butter cookies'} and {'cake'}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header>Instructions</Header>
                                    <UnionGraph width={400} height={500} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header>Ingredients</Header>
                                    <VennDiagram data={data} width={400} height={500} />
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