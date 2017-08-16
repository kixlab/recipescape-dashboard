import React from 'react'
import { Card, Image, Grid, Icon, Button, List, Divider, Label, Header,  Popup} from 'semantic-ui-react'
import {PopupRecipe, Instructions} from './popUpRecipe'
import { Tree } from "./charts/Tree"
import { SVGColors } from './charts/svgColorTranslation'


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
        {ingredients.slice(1,showNumber).map((ingredient, index) => <Label basic key={index}><Label.Detail>{ingredient}</Label.Detail></Label>)}
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


const RecipeCardHeader = ({color, title, removeRecipe, id}) => (
    <Card.Content>
        <Card.Header color={color}>
            <List horizontal relaxed>
                <List.Item><Icon corner color={color} name="delete" onClick={() => removeRecipe(id)} /></List.Item>
                <List.Item><Header size='small' color={color}>{title}</Header></List.Item>
            </List>
        </Card.Header>
    </Card.Content>
);

class RecipeBottomButtons extends React.Component {
render(){
    let color = this.props.color;
    let showRecipe = this.props.showRecipe;
    let hideRecipe = this.props.hideRecipe;
    let toggleTree = this.props.toggleTree;
    let open = this.props.open;

    return (
    <Card.Content extra>
        <Button.Group widths={2}>
            <Button basic color={color} onClick={showRecipe} icon="zoom" />
            <Button basic color={color} icon={this.props.icon} onClick={toggleTree}/>
            <PopupRecipe sentences={this.props.sentences} ingredients={this.props.ingredients} title={this.props.title} trees={this.props.trees} open={open} close={hideRecipe} color={color}/>
        </Button.Group>
    </Card.Content>
    );
}
}

/**PUTTING EVERYTHING TOGETHER */

export class RecipeCard extends React.Component {
    componentWillMount(){
        this.setState({ zoom: false, text: false, icon: "arrow right" });
    }
    
    showRecipe = () => this.setState({zoom: true});
    hideRecipe = () => this.setState({zoom: false});
    toggleTree = () => this.setState({text: !this.state.text, icon: this.state.text? "arrow right": "arrow left"})

render(){
    let element;
    let style = {}
    if(this.props.highlight && this.props.highlight.includes(this.props.element.origin_id)) {
        style = {outlineStyle: 'double', outlineColor: SVGColors[this.props.element.color], outlineWidth: 'thin'}
    }
    if(this.state.text) element = <TextCard {...this.props.element}/>;
    else element = <Tree data={this.props.trees} height={260} width={260}/>;
    return(
        <Card centered style={style}>
            <RecipeCardHeader color={this.props.element.color} title={this.props.element.title} removeRecipe={this.props.removeRecipe} id={this.props.element.origin_id}/>
            <Card.Content onClick={() => this.props.selectRecipe(this.props.element)}>
                {/* <Label as='a' color={this.props.element.color} ribbon='right'><Icon name="flag"/></Label> */}
                {element}
            </Card.Content>
            <RecipeBottomButtons
                {...this.props.element}
                trees = {this.props.trees}
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
