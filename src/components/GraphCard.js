import { Card, Icon, Table,  Label, List, Popup, Loader, Grid, Item} from 'semantic-ui-react'
import Plot from "./charts/GraphPlot"
import React from 'react'
import TopThreeClickable from '../containers/TopThreeClickable'

class GraphCard extends React.Component {

      render(){
        let action = this.props.action? true: false;
        let name = this.props.action? this.props.action : this.props.ingredient;
        return(
          <Item>
            <Item.Description>
              <TopThreeClickable topThree={this.props.neighbors} clicked={this.props.currentOverlay}name={name} action={action}/>
            </Item.Description>
            <Item.Content>
              {this.props.overlayData? 
                  <Plot {...this.props} data={this.props.histogram} overlayData={this.props.overlayData} width={200} height={120} />
                :
                <Plot {...this.props} data={this.props.histogram}  overlayData={[]} width={180} height={120} />  
              }
            </Item.Content>
          </Item>
          
        );
      }
    }

export default GraphCard;