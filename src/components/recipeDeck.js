import React from 'react'
import {PopupRecipe} from './popUpRecipe'
import { Tree } from "./charts/treeRecipe"
import {SaveInput} from './SaveInput'
import { Card, Image, Grid, Icon, Button, List, Divider, Label, Header,  Popup} from 'semantic-ui-react'

// import NavigationClose from 'material-ui/svg-icons/navigation/close';
/**Order: From Small to Big */
/* FIELDS FOR TEXT CARD*/

const Instructions = ({instructions})=> {
        return(
            <List ordered>
                {instructions.map(element => <List.Item>{element}</List.Item>)}
            </List>
        );
}


const TextCard = ({image, ingredients, recipeName, color, instructions}) => {
    let showImage;
    if (image) {
        showImage = <Image src={image} />;
    }

    return (
        <div>
            {showImage}
        <Card.Meta>Ingredients</Card.Meta>
            <Card.Description>
                <Label.Group>
            {ingredients.map((ingredient, index) => <Label basic key={index}>{1+index}<Label.Detail>{ingredient}</Label.Detail></Label>)}
            </Label.Group>
            </Card.Description>
         <Card.Meta>Instructions</Card.Meta>
            <Card.Description>
                <Instructions instructions={instructions}/>
            </Card.Description>
        </div>
    );
}


const RecipeCardHeader = ({color, name}) => (
    <Header
        attached
        color={color}>
        <List horizontal relaxed>
            <List.Item><Icon corner color={color} name="delete" /></List.Item>
            <List.Item><Header as='h4' color={color}>{name}</Header></List.Item>
        </List>
    </Header>
);

class RecipeBottomButtons extends React.Component {
    render(){
        let color = this.props.color;
        let showRecipe = this.props.showRecipe;
        let hideRecipe = this.props.hideRecipe;
        let toggleTree = this.props.toggleTree;
        let open = this.props.open;

        return (
        <Button.Group widths={3} attached="bottom">
            <Button basic color={color} onClick={showRecipe } icon="zoom" />
            <Button basic color={color} icon={this.props.icon} onClick={toggleTree}/>
            <PopupRecipe open={open} close={hideRecipe}/>
        </Button.Group>
        );
    }
}

/**PUTTING EVERYTHING TOGETHER */

class RecipeCard extends React.Component{
    state = { zoom: false, text: false, icon: "arrow right" }

    showRecipe = () => this.setState({zoom: true});
    hideRecipe = () => this.setState({zoom: false});
    toggleTree = () => this.setState({text: !this.state.text, icon: this.state.text? "arrow right": "arrow left"})

    render(){
        let element;
        if(this.state.text)
            element = <TextCard {...this.props.element}/>;
        else element = <Tree data={this.props.trees} height={260} width={260}/>;
        return(
            <Card centered>
                <RecipeCardHeader color={this.props.element.color} name={this.props.element.recipeName}/>
                <Card.Content>
                    {/* <Label as='a' color={this.props.element.color} ribbon='right'><Icon name="flag"/></Label> */}
                    {element}
                </Card.Content>
                <RecipeBottomButtons 
                    color={this.props.element.color}
                    open={this.state.zoom}
                    icon={this.state.icon}
                    showRecipe={this.showRecipe}
                    hideRecipe={this.hideRecipe}
                    toggleTree={this.toggleTree}
                    />
            </Card>
        );
    }
}

export const SavedDecks = ({savedDecks}) =>{
    return( <Label.Group>
        {savedDecks.map(item => <Label>{item}<Icon name='close' /></Label>)}
            </Label.Group>);
}


class RecipeTopMenu extends React.Component {
    state = { open: false }
    show =  () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render(){
        // let savedDecks = this.props.savedDecks;

        return (
    <List horizontal relaxed>
        <List.Item><Button basic onClick={this.show}>save deck</Button></List.Item>
        <SaveInput open={this.state.open} close={this.close} text={"save current deck"}/>
        <List.Item><List.Header>saved decks : </List.Header></List.Item>
        <List.Item><SavedDecks savedDecks={['funny looking', 'amaze']} /></List.Item>
    </List>
        );
    }
}


const RecipeCards = ({recipes, trees}) => {
        return(
            <Grid celled>
                <Grid.Row>
                    <RecipeTopMenu/>
                </Grid.Row>
                <Grid.Row className={"inner"}>
                <Divider/>
                    {recipes.map((element, index) => <RecipeCard key={index} element={element} trees={trees} />)}
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
                        content='Recipes that you clicked in the map on are displayed here'
                    />
                    </h2>
                <div className={"Recipes"}>
                <RecipeCards className={"Recipes"} recipes={recipes} trees={data} />
                </div>
            </div>
        );
}
