import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select } from 'd3-selection'
import { line as d3Line } from 'd3-shape';
import * as d3 from "d3";
import {event as currentEvent} from 'd3';
import SVGColors from './svgColorTranslation'
import { Button, Label,Menu, Icon, Grid } from 'semantic-ui-react'

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

    createPlot(){
        console.log(select(svg))
        let node = this.node;

        let margin = {top: 10, right: 20, bottom: 20, left: 25};
        let width = this.props.width - margin.left - margin.right;
        let height = this.props.height - margin.top - margin.bottom;

        let svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //to replace later
        let dataset = d3.range(10).map(function(d, i) { return {"x": i, "y": d3.randomUniform(10)() } })
        let minX, maxX, x, y;
        this.props.data.forEach((data => {

            let line = d3.line()
            .x(function (d) { return x(d[0]); }) // set the x values for the line generator
            .y(function (d) { return y(d[1]); }) // set the y values for the line generator 
            .curve(d3.curveMonotoneX)

            minX = d3.min(data.plot.map(d=> d[0]));
            maxX = d3.max(data.plot.map(d=> d[0]));

            x = d3.scaleLinear()
            .domain([minX, maxX])
            .range([0, width]);

            y = d3.scaleLinear()
            .domain([d3.min(data.plot.map(d=> d[1])), d3.max(data.plot.map(d=> d[1]))])
            .range([height, 0]);

        svg.append("path")
            .datum(data.plot)
            .attr("class", "line")
            .attr("d", line)
            .style("stroke", SVGColors[data.clusterColor])
            .style("fill", "none")
            .style("stroke-width", 1.5)

        }), this);


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickValues([minX,maxX/2, maxX]).tickFormat((d, i) => ['beginning', 'middle', 'end'][i]))
            .attr("class", "axis")


        svg.append("g")
            .call(d3.axisLeft(y).ticks(0).tickSize(0))
            .attr("class", "axis")


    }

    render(){
        return(
        <div>
        <svg ref={node => this.node = node} ></svg>
        </div>
        );
    }

}




export default Plot;




