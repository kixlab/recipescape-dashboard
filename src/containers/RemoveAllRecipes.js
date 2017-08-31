import {connect} from 'react-redux'
import { Button} from 'semantic-ui-react'
import { unselectAllRecipes } from '../actions'
import React from 'react'



let RemoveAllRecipes = ({ dispatch}) => {
    return (
        <Button basic size='small' onClick={() => dispatch(unselectAllRecipes())}>unselect all</Button>
    )
  }
  RemoveAllRecipes = connect(

  )(RemoveAllRecipes)

  export default RemoveAllRecipes;