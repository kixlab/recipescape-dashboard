import React from 'react'
import { Label, Icon} from 'semantic-ui-react'


export const SavedDecks = ({savedDecks, deleteDeck, loadDeck}) =>{
    return( <Label.Group>
        {savedDecks ? savedDecks.map((item, index)=> <Label key={index} onClick={ () => {loadDeck(item); return false;}}>{item}<Icon name='close' onClick={ () => {deleteDeck(item)}} /></Label>) : 'loading...'}
            </Label.Group>);
    }