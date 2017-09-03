import React from 'react'
import { GroupByControls } from "./clusterField"
import InteractiveClusters from "../containers/InteractiveClusters"
import InteractiveClusterSelection from "../containers/InteractiveClusterSelection"
import { Grid, Divider,Icon } from 'semantic-ui-react'

export const BigRecipeMapContainer = ({clusters}) => (
    <div className={"RecipeMap"}>
        <h2 type={"display3"}>RecipeMap
                <Icon color='grey' size='mini' inverted name='settings' />
        </h2>
        <Grid celled>
            <Grid.Column>
                <InteractiveClusters clusters={clusters} height={350} width={500} />
                <Divider fitted />
                <GroupByControls />
                <InteractiveClusterSelection />
            </Grid.Column>
        </Grid>
    </div>
    );
