import { Modal, Input, Button } from "semantic-ui-react";
import React from "react";

export class SaveInput extends React.Component {
  state = { value: "" };
  render() {
    return (
      <Modal
        size={"mini"}
        dimmer={false}
        open={this.props.open}
        onClose={this.props.close}
      >
        <Modal.Header>{this.props.text}</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder="Name"
            onChange={(event, data) => this.setState({ value: data.value })}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button
            positive
            onClick={() => {
              if (this.state.value !== "") {
                this.props.saveDeck(this.state.value);
                this.props.close();
              }
            }}
          >
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
