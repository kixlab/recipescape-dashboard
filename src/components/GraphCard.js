import React from "react";
import { Item } from "semantic-ui-react";
import Plot from "./charts/GraphPlot";
import TopThreeClickable from "../containers/TopThreeClickable";

const GraphCard = ({
  action,
  ingredient,
  neighbors,
  currentOverlay,
  histogram,
  overlayData,
  histogram_detail,
  ...other
}) => {
  let name = action ? action : ingredient;
  let allRecipes = [];
  histogram_detail.map((d, i) => d.map(da => allRecipes.push(da[1])));

  return (
    <Item>
      <Item.Description>
        <TopThreeClickable
          topThree={neighbors}
          clicked={currentOverlay}
          name={name}
          action={action ? true : false}
        />
      </Item.Description>
      <Item.Content
      //onMouseEnter={() => other.setHighlight(allRecipes)} onMouseLeave={() => other.deleteHighlight()}
      >
        {overlayData ? (
          <Plot
            {...other}
            histogram_detail={histogram_detail}
            data={histogram}
            overlayData={overlayData}
            width={200}
            height={100}
          />
        ) : (
          <Plot
            {...other}
            histogram_detail={histogram_detail}
            data={histogram}
            overlayData={[]}
            width={230}
            height={100}
          />
        )}
      </Item.Content>
    </Item>
  );
};

export default GraphCard;
