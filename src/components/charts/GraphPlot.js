import React from 'react'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select, event as currentEvent } from 'd3-selection'
import { line as d3Line } from 'd3-shape';
import * as d3 from "d3";
// import {event as currentEvent} from 'd3-selection';
import { colorArray } from './svgColorTranslation'


class Plot extends React.Component {

    constructor(props) {
        super(props)
        this.createPlot = this.createPlot.bind(this)
    }

    componentDidMount() {
        this.createPlot()
    }

    componentDidUpdate() {
        this.createPlot()
    }

    createPlot() {
        
        let node = this.node;
        let tooltip = this.tooltip;
        let data = this.props.data;
        let div = select(tooltip)
        let colors = this.props.colors;
        let trans = d3.transition().duration(1000).ease(d3.easeLinear);

        let margin = { top: 10, right: 10, bottom: 20, left: 10 };
        let width = this.props.width - margin.left - margin.right;
        let height = this.props.height - margin.top - margin.bottom;

        if (!this.svg) {
            this.svg = select(node)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        
        //groups
        // Transpose the data into layers
        let addedData = []
        let stack = d3.stack().keys(this.props.selected_clusters).value( (d,key) => {return d[key] })
        this.props.histogram_detail.map((d,i) => {
            let temp = Object.assign({},Array(this.props.selected_clusters.length).fill(0));
            d.map( internal => temp[internal[0]]= temp[internal[0]]? (temp[internal[0]]+1):1)
            addedData.push(temp)
            return 0;
        })
        

        //get scaling for graph
        let x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        x.domain(data.map((d, i) => i + 1));

        let y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(stack(addedData), function(d) {  return d3.max(d, function(d) { return d[0] + d[1]; });  })])
        
        
        // add the x Axis
        if(!this.axis){
        this.axis = this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        }


        if(!this.work)this.work = this.svg.append('g')
        //add the stacked bar graph

        this.groups = this.work.selectAll("g")

        
        let groups = this.groups.data(stack(addedData), (d,i) => d)

        groups.exit().remove()
        
        let selected_clusters= this.props.selected_clusters

        let stacks = groups.enter()
            .append("g")
            .attr("class", (d,i) => selected_clusters[i])
            .style("fill", function (d, i) {
            return colors[i];
        });

        this.rect = stacks.selectAll("rect")
            .data(d => d)
            
        let det = this.props.histogram_detail;
        let set = this.props.setHighlight;
        let deletes = this.props.deleteHighlight;

        this.rect.enter().append("rect")
            .attr("x", function (d, i) { return x(i + 1); })
            .attr("y", function (d) { return y(d[0] + d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[0] + d[1]); })
            .attr("width", x.bandwidth())
            .on("mouseover", function (d,i) {
                let clusterNo = currentEvent.path[0].parentNode.className.baseVal
                set(det[i].filter( d => d[0] == clusterNo).map(d => d[1]))
                console.log(det[i].filter( d => d[0] == clusterNo).map(d => d[1]))
            })
            .on("mouseout", function () { 
                deletes()
            })
            .on("mousemove", function (d) {
            });
        
          
        // add the y Axis
        // svg.append("g")
        //     .call(d3.axisLeft(y));
          
        //line overlay
        let line = d3.line()
        .x(function (d,i) { return x(i+1)+x.bandwidth()/2; }) 
        .y(function (d,i) { return y(d); })
        .curve(d3.curveMonotoneX)


        if(this.props.overlayData.length != 0){
            this.props.overlayData.then(data =>{

            if(!this.path) this.path = this.svg.append("path")
                this.path.datum(data, d => d)
                .transition(trans)
                .attr("class", "line")
                .attr("d", line)
                .style("stroke", 'black')
                .style("fill", "none")
                .style("stroke-width", 1.5)
            
            })
        } else {
            select(node).selectAll('.line').remove();
            this.path = undefined;
        }






    }


    render(){
        return(
        <div>
             <div style={{position: "absolute", display: "None"}} className="ui left pointing basic label" ref={tooltip => this.tooltip = tooltip}/> 
            <svg ref={node => this.node = node} >
            </svg>
        </div>
        );
    }

}




export default Plot;




