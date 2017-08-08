import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { select, event as currentEvent } from 'd3-selection'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import {zoom} from 'd3-zoom';
import { hull } from 'd3-polygon'
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
        let tooltip = this.tooltip;
        let div = select(tooltip)

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
            
            //generate area of cluster
            let hull = circles.append("path")
                    .attr("class", "hull")
                    
                    hull.datum(d3.polygonHull(element.points.map(x => x.pos)))
                    .attr("d", function(d) {
                        return "M" + d.join("L") + "Z"; })
                    .attr("fill", SVGColors[element.color])
                    .attr("stroke", SVGColors[element.color])
                    .attr("stroke-width", 32+"px")
                    .attr("line-join", "rounded")
                    .attr("opacity", 0.3)
                    .attr("stroke-linejoin", "round")
                    .on("mouseover", () => {
                        hull.attr("stroke", "gray")
                    })
                    .on("mouseout", () => {
                        hull.attr("stroke", SVGColors[element.color])
                    })
            this.createCluster(element.points, element.color, circles, element.r, div)
        });

        select(node).call(zoom().scaleExtent([1, 4]).on("zoom", ()=> {
            circles.attr("transform", currentEvent.transform)
        }));

    }

    createCluster(points, color, node, r, div){
        node.append("g")
            .selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.pos[0])
            .attr("cy", (d) => d.pos[1])
            .attr("r", r)
            .attr("fill", SVGColors[color])
            .on("mouseover", () => {
                div.style("display", "inline-block")
                div.html("pizza")
                    .style("left", (currentEvent.layerX + 20) + "px")
                    .style("top", (currentEvent.layerY - 3) + "px");
            })
            .on("mouseout", () => {
                setTimeout(() =>{
                    div.style("display", "None");
                }, 300)
            });
    }


    render(){
        return(
            <div style={{overflow: "auto"}}>
                <div style={{position: "absolute", display:"None"}} className="ui left pointing basic label" ref={tooltip => this.tooltip = tooltip}/>
                <svg ref={node => this.node = node} />
            </div>
        );
    }
}
