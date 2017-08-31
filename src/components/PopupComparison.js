import React from 'react'
import {Modal, Button, Header, Grid, Loader} from 'semantic-ui-react'
import {UnionGraph} from './charts/unionGraph'
import {VennDiagram} from './charts/vennDiagram'
import { stopCompareRecipes } from '../actions'
import {connect} from 'react-redux'
import axios from 'axios'

const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"

const mapStateToProps = (state) => ({
    Ingredients : state.recipeDeck.HighlightedRecipes[0] & state.recipeDeck.HighlightedRecipes[1] 
                ? state.recipeDeck.HighlightedRecipes : undefined,
    open : state.recipeDeck.open,
    recipeData: state.recipeDeck.recipeCompareData,
    dishname: state.clusters.RecipeName,
    title : state.recipeDeck.DisplayedRecipes.filter(d => state.recipeDeck.HighlightedRecipes.includes(d.origin_id)).map(d => d.title).join(' vs '),
});

const mapDispatchToProps = (dispatch) => ({
    onClick : () => dispatch(stopCompareRecipes()),
})


class _PopupComparison extends React.Component {

    state = {loading: true}
    histograms = {}
  
    constructor(){
      super();
    }
  
    componentWillReceiveProps(nextProps) {
      if(nextProps.recipeData)nextProps.recipeData.then(d=>
        {
          this.setState({data: d})
          this.setState({loading: false})
        
      })
    }

    render() {

        let ingredientData = {}
        let actionData = {}

        if(!this.state.loading){
        
        //for actions
        actionData= {recipe1: this.state.data[0].actions, recipe2: this.state.data[1].actions}
        //calculate intersection for ingredients
            let r1 = new Set(this.state.data[0].ingredients)
            let r2 = new Set(this.state.data[1].ingredients)
            let intersection =
                [...r1].filter(x => r2.has(x));
            let recipe1 = [...r1].filter(x => !r2.has(x))
            let recipe2 = [...r2].filter(x => !r1.has(x))
            ingredientData = {
                Recipe1: {ingredients: recipe1},
                Intersection: {ingredients: intersection},
                Recipe2: {ingredients: recipe2}
            }
        }
        

        return (
        <Modal dimmer={false} open={this.props.open} onClose={this.props.onClick}>
            <Modal.Header>{this.props.title}</Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description>
                    <Grid columns={2} divided>
                            { !this.state.loading ? 
                        <Grid.Row>
                            <Grid.Column>
                                <Header>Instructions</Header>
                                <UnionGraph data={actionData} width={400} height={500} />
                            </Grid.Column>
                            <Grid.Column>
                                <Header>Ingredients</Header>
                                <VennDiagram data={ingredientData} width={400} height={500} />
                            </Grid.Column>
                        </Grid.Row>
                            :
                            <Loader active size='large'>Loading</Loader>
                            }
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={this.props.onClick}>
                    Close
                    </Button>
            </Modal.Actions>
        </Modal>
    );

    }
}
const PopupComparison = connect(
    mapStateToProps, 
    mapDispatchToProps
  )(_PopupComparison)

export default PopupComparison;
