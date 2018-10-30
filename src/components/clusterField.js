import React from "react";
import { Button, List, Divider, Segment, Icon } from "semantic-ui-react";
import { numbertocolor } from "./charts/svgColorTranslation";
import AllOrNothingButtons from "../containers/AllOrNothingButtons";
import InteractiveSaveClusters from "../containers/InteractiveSaveClusters";
import ClusterDropdown from "../containers/ClusterDropdown";

const ClusterSquare = ({ color, selected, onClick }) => {
  let icon = selected ? "checkmark" : "";
  return (
    <List.Item style={{ cursor: "pointer" }}>
      <Icon circular color={color} inverted name={icon} onClick={onClick} />
    </List.Item>
  );
};

export const ClusterSelection = ({ clusters, onClick }) => (
  <div className={"ClusterSelection"}>
    <Segment vertical>
      <AllOrNothingButtons />
      <Divider hidden fitted />
      <List horizontal>
        {clusters.map((checked, index) => (
          <ClusterSquare
            color={numbertocolor[index]}
            selected={checked}
            key={numbertocolor[index] + index}
            onClick={() => onClick(index)}
          />
        ))}
      </List>
      <Divider hidden fitted />
      {/* <SaveClusters /> */}
    </Segment>
  </div>
);

class SaveClusters extends React.Component {
  state = { open: false };
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <List horizontal>
        <List.Item>
          <Button size="small" basic onClick={this.show}>
            save selected clusters
          </Button>
        </List.Item>
        <InteractiveSaveClusters
          open={this.state.open}
          close={this.close}
          text={"Save selected clusters"}
        />
        <List.Item>
          <ClusterDropdown />
        </List.Item>
      </List>
    );
  }
}
