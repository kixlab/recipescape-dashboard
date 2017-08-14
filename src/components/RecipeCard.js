import React from 'react'
import { Card, Image, Grid, Icon, Button, List, Divider, Label, Header,  Popup} from 'semantic-ui-react'
import {PopupRecipe} from './popUpRecipe'
import { Tree } from "./charts/treeRecipe"

const Instructions = ({instructions})=> {
    return(
        <List ordered>
            {instructions.map(element => <List.Item>{element}</List.Item>)}
        </List>
    );
}


const TextCard = ({image_url, ingredients, color, sentences}) => {
let showImage;
let showNumber = 3;
if (image_url) {
    showImage = <Image src={image_url} />;
    showNumber = 2;
}

return (
    <div>
        {showImage}
    <Card.Meta>Ingredients</Card.Meta>
        <Card.Description>
            <Label.Group>
        {ingredients.slice(1,showNumber).map((ingredient, index) => <Label basic key={index}>{1+index}<Label.Detail>{ingredient}</Label.Detail></Label>)}
        </Label.Group>
        ...
        </Card.Description>
     <Card.Meta>Instructions</Card.Meta>
        <Card.Description>
            <Instructions instructions={sentences.slice(1,showNumber)}/>
            ...
        </Card.Description>
    </div>
);
}


const RecipeCardHeader = ({color, title, onClick, key}) => (
<Header
    attached
    color={color}>
    <List horizontal relaxed>
        <List.Item><Icon corner color={color} name="delete" onClick={onClick(key)}/></List.Item>
        <List.Item><Header size='tiny' color={color}>{title}</Header></List.Item>
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
        <Button basic color={color} onClick={showRecipe} icon="zoom" />
        <Button basic color={color} icon={this.props.icon} onClick={toggleTree}/>
        <PopupRecipe open={open} close={hideRecipe}/>
    </Button.Group>
    );
}
}

/**PUTTING EVERYTHING TOGETHER */

export class RecipeCard extends React.Component {
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
            <RecipeCardHeader color={this.props.element.color} title={this.props.element.title} onClick={this.props.removeRecipe} id={this.props.key}/>
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
