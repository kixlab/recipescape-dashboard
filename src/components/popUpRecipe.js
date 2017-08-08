import React from 'react'
import {Modal, Button, Header} from 'semantic-ui-react'

export class PopupRecipe extends React.Component {
    

    render(){
        return(
            <Modal dimmer={false} open={this.props.open} onClose={this.props.close}>
                <Modal.Header>{this.props.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.props.close}>
                        Nope
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.close} />
                </Modal.Actions>
            </Modal>

        );
    }

}