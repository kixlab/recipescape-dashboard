import React from 'react'
import InteractiveGroupByControls from "../containers/InteractiveGroupByControls"
import InteractiveClusters from "../containers/InteractiveClusters"
import InteractiveClusterSelection from "../containers/InteractiveClusterSelection"
import { Dropdown, Grid, Divider,Icon } from 'semantic-ui-react'

const getRealName = name => {
    switch(name) {
        case 'chocochip':
            return 'Chocolate Chip Cookie'
        case 'tomatopasta':
            return 'Tomato Pasta'
        default:
            return name
    }
}

const ClusterModeDropdown = () => (
    <Dropdown text='Group By'>
        <Dropdown.Menu>
            <Dropdown.Item text="Structure" />
            <Dropdown.Item text="Ingredients" />
        </Dropdown.Menu>
    </Dropdown>
)

export const BigRecipeMapContainer = ({clusters, name, changeDishname}) => (
    <div className={"RecipeMap"}>
        <h2 type={"display3"}>RecipeMap for {getRealName(name)}
                <Icon color='grey' size='mini' inverted name='settings'
                onClick={() => {name === 'tomatopasta'? changeDishname('chocochip'): changeDishname('tomatopasta')}}/>
        </h2>
        <ClusterModeDropdown />
        <Grid celled>
            <Grid.Column>
                <InteractiveClusters clusters={clusters} height={350} width={500} />
                <Divider fitted />
                <InteractiveGroupByControls />
                <InteractiveClusterSelection />
            </Grid.Column>
        </Grid>
    </div>
    );
