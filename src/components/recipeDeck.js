import React from 'react'
import { Tree } from "./charts/treeRecipe"
import { Card, Image, Grid, Icon, Menu, Button, List, Segment, Divider, Rail, Label, Header} from 'semantic-ui-react'

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
                <Card.Content>
                    <Card.Header>
                        <List horizontal relaxed>
                    <List.Item><Icon corner color={this.props.element.color} name="delete"/></List.Item>
                        <List.Item><Header as='h4' color={this.props.element.color}>{this.props.element.recipeName}</Header></List.Item>
                    </List>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    {element}
                </Card.Content>
                    <Button.Group widths={3} attached="bottom">
                        <Button basic color={this.props.element.color} corner icon="remove" />
                        <Button basic color={this.props.element.color} corner icon="zoom" />
                        <Button basic color={this.props.element.color} corner icon="arrow right" />
                    </Button.Group>
            </Card>
        );
    }
}


const RecipeCards = ({recipes, trees}) => {
        return(
        <div>
            <Grid celled>
                <Grid.Row>
                    <List horizontal relaxed divided>
                    <List.Item><Button basic>save deck</Button></List.Item>
                    <List.Item><List.Header>saved decks : </List.Header></List.Item>
                    </List>
                </Grid.Row>
                <Grid.Row>
                <Divider/>
                <Card.Group>
                    {recipes.map((element, index) => <RecipeCard key={index} element={element} trees={trees} />)}
                </Card.Group>
                </Grid.Row>
            </Grid>
        </div>
        );
}

export const RecipeDeck = ({recipes, data}) => {
        return (
            <div>
                <h2 type={"display1"} gutterBottom>Recipe Deck</h2>
                    <RecipeCards recipes={recipes} trees={data}/>
            </div>
        );
}
