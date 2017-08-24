import React from 'react'
import {PopupRecipe} from './popUpRecipe'
import { SaveInput } from './SaveInput'
import { SavedDecks } from './SavedDecks'
import {RecipeCard} from './RecipeCard'
import InteractiveRecipeCard from "../containers/InteractiveRecipeCard"
import InteractiveSavedDecks from "../containers/InteractiveSavedDecks"
import InteractiveSaveDeck from "../containers/InteractiveSaveDeck"
import InteractiveCompareRecipesButton from "../containers/InteractiveCompareRecipesButton"
import PopupComparison from './PopupComparison'
import { Card, Image, Grid, Icon, Button, List, Divider, Label, Header,  Popup, Rail, Segment} from 'semantic-ui-react'

// import NavigationClose from 'material-ui/svg-icons/navigation/close';
/**Order: From Small to Big */
/* FIELDS FOR TEXT CARD*/


class RecipeTopMenu extends React.Component {
    state = { open: false }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
    // let savedDecks = this.props.savedDecks;

        return (
        <List horizontal relaxed>
            <List.Item><Button basic onClick={this.show} size='small'>save deck</Button></List.Item>
            <InteractiveSaveDeck open={this.state.open} close={this.close} text={"save current deck"} />
            <List.Item><List.Header>saved decks : </List.Header></List.Item>
            <List.Item><InteractiveSavedDecks /></List.Item>
        </List>
        );
    }
}

export const RecipeCards = ({recipes, trees}) => {
        return(
            <Grid celled>
                <Grid.Row>
                    <RecipeTopMenu/>
                </Grid.Row>
                <Grid.Row className={'Recipes'}>
                <Divider/>
                    { recipes ? recipes.map((element, index) => <InteractiveRecipeCard key={element.origin_id}element={element} trees={trees} />) : 'haha'}
                </Grid.Row>
            </Grid>
        );
}

export const RecipeDeck = ({recipes, data}) => {
        return (
            <div>
                <h2>Recipe Deck 
                      <Popup
                        trigger={<Icon color="grey" size="tiny" name="question circle" />}
                        content='Recipes that you clicked in the map on are displayed her'
                    />
                    </h2>
                <div>
                    <InteractiveCompareRecipesButton/>
                    <PopupComparison />
                    <RecipeCards recipes={recipes} trees={data}/>
                </div>
            </div>
        );
}
