import React from "react";
import { Card, Grid, Icon, Button, List, Header } from "semantic-ui-react";
import { PopupRecipe } from "./popUpRecipe";
import { Tree } from "./charts/Tree";
import { SVGColors } from "./charts/svgColorTranslation";

const TextCard = ({ image_url, ingredients, color, sentences }) => {
  let showNumber = 3;

  return (
    <div>
      <Card.Meta>Ingredients</Card.Meta>
      <Card.Description>
        <List ordered size="tiny">
          {ingredients.slice(0, showNumber).map((ingredient, index) => (
            <List.Item key={ingredient + index}>{ingredient}</List.Item>
          ))}
        </List>
        ...
      </Card.Description>
      <Card.Meta>Instructions</Card.Meta>
      <Card.Description>
        <List ordered size="tiny">
          {sentences.slice(0, showNumber).map((element, index) => (
            <List.Item key={element + index}>{element}</List.Item>
          ))}
        </List>
        ...
      </Card.Description>
    </div>
  );
};

const RecipeCardHeader = ({ color, title, removeRecipe, id }) => (
  <Card.Content>
    <Card.Header color={color}>
      <List horizontal relaxed>
        <List.Item style={{ cursor: "pointer" }}>
          <Icon
            corner
            color={color}
            name="delete"
            onClick={() => removeRecipe(id)}
          />
        </List.Item>
        <List.Item>
          <Header size="small" color={color}>
            {title}
          </Header>
        </List.Item>
      </List>
    </Card.Header>
  </Card.Content>
);

class RecipeBottomButtons extends React.Component {
  render() {
    let color = this.props.color;
    let showRecipe = this.props.showRecipe;
    let hideRecipe = this.props.hideRecipe;
    let toggleTree = this.props.toggleTree;
    let open = this.props.open;

    return (
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color={color} onClick={showRecipe} icon="zoom" />
          <Button
            basic
            color={color}
            icon={this.props.icon}
            onClick={toggleTree}
          />
          <PopupRecipe
            sentences={this.props.sentences}
            ingredients={this.props.ingredients}
            title={this.props.title}
            trees={this.props.trees}
            open={open}
            close={hideRecipe}
            color={color}
            image={this.props.image_url}
          />
        </Button.Group>
      </Card.Content>
    );
  }
}

/**PUTTING EVERYTHING TOGETHER */

export class RecipeCard extends React.Component {
  componentWillMount() {
    this.setState({ zoom: false, text: false, icon: "arrow right" });
  }

  showRecipe = () => this.setState({ zoom: true });
  hideRecipe = () => this.setState({ zoom: false });
  toggleTree = () =>
    this.setState({
      text: !this.state.text,
      icon: this.state.text ? "arrow right" : "arrow left"
    });

  render() {
    let element;
    let style = {};
    if (
      this.props.highlight &&
      this.props.highlight.includes(this.props.element.origin_id)
    ) {
      style = {
        outlineStyle: "double",
        outlineColor: SVGColors[this.props.element.color],
        outlineWidth: "thin"
      };
    }
    if (this.state.text) element = <TextCard {...this.props.element} />;
    else
      element = (
        <Tree data={this.props.element.trees} height={260} width={200} />
      );
    return (
      <Grid.Column width={4}>
        <Card centered style={style}>
          <RecipeCardHeader
            color={this.props.element.color}
            title={this.props.element.title}
            removeRecipe={this.props.removeRecipe}
            id={this.props.element.origin_id}
          />
          <Card.Content
            onClick={() =>
              this.props.selectRecipe(this.props.element.origin_id)
            }
            style={{ cursor: "pointer" }}
          >
            {element}
          </Card.Content>
          <RecipeBottomButtons
            {...this.props.element}
            color={this.props.element.color}
            open={this.state.zoom}
            icon={this.state.icon}
            showRecipe={this.showRecipe}
            hideRecipe={this.hideRecipe}
            toggleTree={this.toggleTree}
          />
        </Card>
      </Grid.Column>
    );
  }
}
