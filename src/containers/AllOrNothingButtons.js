import {connect} from 'react-redux'
import { List, Button } from 'semantic-ui-react'
import { selectAll, unselectAll } from '../actions'
import React from 'react'

let AllOrNothingButtons = ({dispatch}) => {
        return(
            <List horizontal>
                <List.Item><List.Header>Clusters : </List.Header></List.Item>
                <List.Item><Button basic onClick={() => dispatch(selectAll())}>select all</Button></List.Item>
                <List.Item><Button basic onClick={() => dispatch(unselectAll())}>unselect all</Button></List.Item>
            </List>
        );
}

AllOrNothingButtons = connect()(AllOrNothingButtons)

  export default AllOrNothingButtons