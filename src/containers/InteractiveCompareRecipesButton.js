import {connect} from 'react-redux'
import { Button, Message, Header,Label } from 'semantic-ui-react'
import { compareRecipes } from '../actions'
import React from 'react'


const mapStateToProps = (state) => ({
    show: state.recipeDeck.HighlightedRecipes.length == 2
});

let InteractiveCompareRecipesButton = ({ dispatch, show}) => {
    return (
        <div>
        {show ? 
        <Message floating>
            <Header>Do you want to compate the two selected recipes? <Button as={Label} floated='right' color='blue' onClick={() => dispatch(compareRecipes())}>Compare</Button> </Header>
        </Message> 
        : 
        ""
        }
    </div>
            
    );
  }
  InteractiveCompareRecipesButton = connect(
    mapStateToProps
  )(InteractiveCompareRecipesButton)

  export default InteractiveCompareRecipesButton;