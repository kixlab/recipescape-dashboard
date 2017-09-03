import React from 'react'
import { Label, Icon} from 'semantic-ui-react'


export const SavedDecks = ({savedDecks, deleteDeck, loadDeck}) =>{
    return( <Label.Group>
        {savedDecks ? savedDecks.map((item, index)=> <Label size='mini' key={item+index} style={{cursor: 'pointer'}}><Label.Detail onClick={ () => {loadDeck(item)}} >{item}</Label.Detail><Icon name='close' onClick={ () => {deleteDeck(item)}} /></Label>) : 'loading...'}
            </Label.Group>
    );
}