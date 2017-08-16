import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { select, event as currentEvent } from 'd3-selection'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import { hull } from 'd3-polygon'
import * as d3 from "d3";
import { colorArray, numbertocolor } from './svgColorTranslation' // used for colors

export class Clusters extends React.Component {
    constructor(props) {
        super(props)
        this.createMap = this.createMap.bind(this)
        this.createCluster = this.createCluster.bind(this)
        this.hull = [];
        this.circle = [];
    }

    componentDidMount() {
        this.createMap()
    }

    componentDidUpdate() {
        this.createMap()
    }


    createMap() {
        console.log(this.svg)
        let node = this.node;
        let tooltip = this.tooltip;
        let div = select(tooltip)
        let r = 4;

        let margin = { top: 10, right: 20, bottom: 20, left: 25 };
        let width = this.props.width - margin.left - margin.right;
        let height = this.props.height - margin.top - margin.bottom;


        if (!this.svg) {
        this.svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        }

        if (!this.circles) {
        this.circles = this.svg.append("g")
            .attr("class", "circles");
        }

        let cluster = this.props.clusters
        let clusterByNo = {};
        cluster.map(d => clusterByNo[d.cluster_no] = clusterByNo[d.cluster_no] ? [...clusterByNo[d.cluster_no], d] : [d])

        var x = d3.scaleLinear()
            .domain([d3.min(cluster.map(dot => dot.x)), d3.max(cluster.map(dot => dot.x))])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([d3.min(cluster.map(dot => dot.y)), d3.max(cluster.map(dot => dot.y))])
            .range([0, height]);

        for (let [key, points] of Object.entries(clusterByNo)) {
            if (!this.hull[key]) {
            this.hull[key] = this.circles.append("path")
                .attr("class", "hull"+key)
            }
            this.hull[key].datum(d3.polygonHull(points.map(dot => [x(dot.x), y(dot.y)])))
                .attr("d", function (d) {
                    return "M" + d.join("L") + "Z";
                })
                .attr("fill", colorArray[key])
                .attr("stroke", colorArray[key])
                .attr("stroke-width", 15 + "px")
                .attr("line-join", "rounded")
                .attr("opacity", this.props.activeCluster[key]? 0.3 : 0)
                .attr("stroke-linejoin", "round")
                .on("mouseover", () => {
                    this.hull[key].attr("fill", "gray")
                        .attr("stroke", "gray");
                })
                .on("mouseout", () => {
                    this.hull[key].attr("fill", colorArray[key])
                        .attr("stroke", colorArray[key]);
                })
                .on("click", () => this.props.select(key));
            this.createCluster(points, this.circles, r, div, x, y, key)

        }

        select(node).call(zoom().scaleExtent([1, 4]).on("zoom", () => {
            this.circles.attr("transform", currentEvent.transform)
        }));

    }

    createCluster(points, node, r, div, x, y,key) {
        let add = this.props.add;
        if (!this.circle[key]) {
            this.circle[key] = node.append("g")
                .selectAll("circle")
                .data(points)
                .enter()
                .append("circle")
        } 


        this.circle[key]
            .attr("cx", (d) => x(d.x))
            .attr("cy", (d) => y(d.y))
            .attr("r", r)
            .attr("fill", d => colorArray[d.cluster_no])
            .attr("opacity", this.props.activeCluster[key]? 1 : 0.3)
            .on("mouseover", 
                (d) => {
                if(this.props.activeCluster[key]){
                div.style("display", "inline-block")
                div.html(d.recipeName.title)
                    .style("left", (currentEvent.layerX + 20) + "px")
                    .style("top", (currentEvent.layerY - 3) + "px");
                }
            })
            .on("mouseout", () => {
                setTimeout(() => {
                    div.style("display", "None");
                }, 300)
            })
            .on("click", function (d) {
                add({ ...d.recipeName, color: numbertocolor[d.cluster_no] })
            })
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
