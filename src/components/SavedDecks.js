import React from 'react'
import { Label, Icon} from 'semantic-ui-react'


export const SavedDecks = ({savedDecks}) =>{
    return( <Label.Group>
        {savedDecks.map(item => <Label>{item}<Icon name='close' /></Label>)}
            </Label.Group>);
    }