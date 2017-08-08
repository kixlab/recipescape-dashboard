import { Modal, Input, Button} from 'semantic-ui-react'
import React from 'react'

export class SaveInput extends React.Component {
    state = {value: "lazy collection"}
    render(){
        return (
        <Modal size={"mini"} dimmer={false} open={this.props.open} onClose={this.props.close}>
            <Modal.Header>
                {this.props.text}
        </Modal.Header>
            <Modal.Content>
                <Input fluid placeholder='Name' onChange={(event, data) => this.setState({value : data.value}) }/>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={this.props.close}>Cancel</Button>
                <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={() => {console.log(this.state.value); this.props.close()}}/>
            </Modal.Actions>
        </Modal>
        );
    }
}