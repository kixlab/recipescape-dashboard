import React from 'react'
import {Modal, Button, Header, Grid} from 'semantic-ui-react'
import {UnionGraph} from './charts/unionGraph'
import {VennDiagram} from './charts/vennDiagram'
import { stopCompareRecipes } from '../actions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    Ingredients1 : state.recipeDeck.HighlightedRecipes[0] ? state.recipeDeck.HighlightedRecipes[0].ingredients: [],
    Ingredients2 : state.recipeDeck.HighlightedRecipes[1] ? state.recipeDeck.HighlightedRecipes[1].ingredients: [],
    open : state.recipeDeck.open,
    title : state.recipeDeck.HighlightedRecipes[1] && state.recipeDeck.HighlightedRecipes[0] ? (state.recipeDeck.HighlightedRecipes[0].title + " vs " + state.recipeDeck.HighlightedRecipes[1].title) : "",
});


let PopupComparison = ({dispatch, open, Ingredients1, Ingredients2, title}) => {

    //GIVE ME BETTER DATA
    let close = () => dispatch(stopCompareRecipes());
    let data = {r1: [], intersection:[], r2: []};
    Ingredients1.map(ingr => Ingredients2.includes(ingr)? data.intersection.push(ingr) : data.r1.push(ingr))
    data.r2 = Ingredients2.filter((i) => !data.intersection.includes(i));
    data = {
        Recipe1: { ingredients: ["tomato", "pepper", "sugar", "garlic", "olives", "of", "ingredients"] },
        Intersection: { ingredients: ["salt", "pasta", "beef", "onions", "it", "will", "adapt", "it", "more"] },
        Recipe2: {
            ingredients: ["a", "lot", "of", "ingredients"]
        },
    };
    return (
        <Modal dimmer={false} open={open} onClose={close}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content scrolling>
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
                <Button onClick={close}>
                    Close
                    </Button>
            </Modal.Actions>
        </Modal>
    );
}

PopupComparison = connect(
    mapStateToProps
  )(PopupComparison)

  export default PopupComparison;
