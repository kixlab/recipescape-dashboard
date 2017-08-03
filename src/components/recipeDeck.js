import React from 'react'
import { Tree } from "./charts/treeRecipe"
import { Card, Image, Grid, Icon, Menu, Button, List, Segment, Divider, Rail, Label, Header, Message, Popup} from 'semantic-ui-react'

// import NavigationClose from 'material-ui/svg-icons/navigation/close';
/**Order: From Small to Big */
/* FIELDS FOR TEXT CARD*/

const Element = ({element}) =>{
        return (
            <td>{element}</td>
        );
    };

const DoubleRow = ({first, second}) => {
        return (
            <tr>
                <Element element={first}/>
                <Element element={second}/>
            </tr>
        );
}

const SingleRow = ({element})=> {
        return(
            <tr><td >{element}</td></tr>
        );
}


const TextCard = ({image, ingredients, recipeName, color, instructions}) => {
    let ingredientTable = [];
    let showImage;
    if (image) {
        showImage = <Image src={image} />;
    }
    for (var index = 0; index < ingredients.length; index = index + 2) {
        ingredientTable.push(<DoubleRow first={ingredients[index]} second={ingredients[index + 1]} key={ingredients[index] + ingredients[index + 1]} />);
    }

    return (
        <div>
            {showImage}
        <Card.Meta>Ingredients</Card.Meta>
            <Card.Description>
                    <table>
                        <tbody>
                            {ingredientTable}
                        </tbody>
                    </table> 
            </Card.Description>
         <Card.Meta>Instructions</Card.Meta>
            <Card.Description>
                    <table>
                        <tbody>
                            {instructions.map(element => <SingleRow key={element} element={element}/>)}
                        </tbody>
                    </table>
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

const RecipeBottomButtons = ({color}) => (
    <Button.Group widths={3} attached="bottom">
        <Button basic color={color} icon="zoom" />
        <Button basic color={color} icon="arrow right" />
    </Button.Group>
);

/**PUTTING EVERYTHING TOGETHER */

class RecipeCard extends React.Component{
    render(){
        console.log(this.props)
        let element;
        if(true)
            element = <TextCard {...this.props.element}/>;
        else element = <Tree data={this.props.trees} height={260} width={200}/>;
        return(
            <Card centered>
                <RecipeCardHeader color={this.props.element.color} name={this.props.element.recipeName}/>
                <Card.Content>
                    <Label as='a' color={this.props.element.color} ribbon='right'><Icon name="flag"/></Label>
                    {element}
                </Card.Content>
                <RecipeBottomButtons color={this.props.element.color}/>
            </Card>
        );
    }
}

const SavedDecks = ({savedDecks}) =>{
    return( <Label.Group>
        {savedDecks.map(item => <Label>{item}<Icon name='close' /></Label>)}
            </Label.Group>);
}

const RecipeTopMenu = ({savedDecks}) => (
    <List horizontal relaxed>
        <List.Item><Button basic>save deck</Button></List.Item>
        <List.Item><List.Header>saved decks : </List.Header></List.Item>
        <List.Item><SavedDecks savedDecks={['funny looking', 'amaze']} /></List.Item>
    </List>
);

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
