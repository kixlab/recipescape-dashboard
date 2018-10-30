import React from "react";
import InteractiveGroupByControls from "../containers/InteractiveGroupByControls";
import InteractiveClusters from "../containers/InteractiveClusters";
import InteractiveClusterSelection from "../containers/InteractiveClusterSelection";
import { Dropdown, Grid, Divider, Icon } from "semantic-ui-react";

const getRealName = name => {
  switch (name) {
    case "chocochip":
      return "Chocolate Chip Cookie";
    case "tomatopasta":
      return "Tomato Pasta";
    default:
      return name;
  }
};

export const BigRecipeMapContainer = ({ clusters, name, changeDishname }) => (
  <div className={"RecipeMap"}>
    {/* <span style={{fontSize: '1.71428571rem', fontFamily: 'Lato', fontWeight: '700', marginBottom: '14px'}}> */}
    <h3 type={"display3"} style={{ display: "inline" }}>
      RecipeMap for {getRealName(name)}
      <Icon
        color="grey"
        size="mini"
        inverted
        name="settings"
        onClick={() => {
          name === "tomatopasta"
            ? changeDishname("chocochip")
            : changeDishname("tomatopasta");
        }}
      />
    </h3>
    <div style={{ float: "right", marginTop: "10px" }}>
      <InteractiveGroupByControls />
    </div>
    <Grid celled>
      <Grid.Column>
        <InteractiveClusters clusters={clusters} height={350} width={500} />
        <Divider fitted />
        <InteractiveClusterSelection />
      </Grid.Column>
    </Grid>
  </div>
);
