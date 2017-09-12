import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export const ClusterModeDropdown = ({groupByIngredients, groupByStructure}) => (
    <Dropdown
        text='Group By'
    >
        <Dropdown.Menu>
            <Dropdown.Item text="Structure" onClick={groupByStructure} />
            <Dropdown.Item text="Ingredients" onClick={groupByIngredients} />
        </Dropdown.Menu>
    </Dropdown>
)
