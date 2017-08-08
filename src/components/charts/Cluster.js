import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { select, event as currentEvent } from 'd3-selection'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import {zoom} from 'd3-zoom';
import * as d3 from "d3";
import SVGColors from './svgColorTranslation' // used for colors

export class Clusters extends React.Component {
    constructor(props) {
        super(props)
        this.createMap = this.createMap.bind(this)
        this.createCluster = this.createCluster.bind(this)
    }

    componentDidMount() {
        this.createMap()
    }

    componentDidUpdate() {
        this.createMap()
    }


    createMap(){
        let node = this.node;

        let margin = {top: 10, right: 20, bottom: 20, left: 25};
        let width = this.props.width - margin.left - margin.right;
        let height = this.props.height - margin.top - margin.bottom;

        let svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            
        let circles = select(node).append("g")
            .attr("class", "circles");

        this.props.data.map((element) => {
            this.createCluster(element.points, element.color, circles, element.r)
        });

        select(node).call(zoom().scaleExtent([1, 4]).on("zoom", ()=> {
            circles.attr("transform", currentEvent.transform)
            console.log(circles)
        }));

    }

    createCluster(points, color, node, r){
        node.append("g")
            .selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.pos[0])
            .attr("cy", (d) => d.pos[1])
            .attr("r", r)
            .attr("fill", color);
    }


    render(){
        return(
            <div style={{overflow: "auto"}}>
            <svg ref={node => this.node = node}>
            </svg>
            </div>
        );
    }
}
