import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { select, event as currentEvent } from 'd3-selection'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import { hull } from 'd3-polygon'
import * as d3 from "d3";
import { colorArray } from './svgColorTranslation' // used for colors

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


    createMap() {
        let node = this.node;
        let tooltip = this.tooltip;
        let div = select(tooltip)
        let r = 4;

        let margin = { top: 10, right: 20, bottom: 20, left: 25 };
        let width = this.props.width - margin.left - margin.right;
        let height = this.props.height - margin.top - margin.bottom;

        let svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        let circles = select(node).append("g")
            .attr("class", "circles");

        let clusters = this.props.clusters

        for (let [key, element] of Object.entries(clusters)) {

            let cluster = Object.keys(element).map(key => element[key])
            let clusterByNo = {};
            cluster.map(d => clusterByNo[d.cluster_no] = clusterByNo[d.cluster_no] ? [...clusterByNo[d.cluster_no], d] : [d])

            var x = d3.scaleLinear()
                .domain([d3.min(cluster.map(dot => dot.x)), d3.max(cluster.map(dot => dot.x))])
                .range([0, width]);

            var y = d3.scaleLinear()
                .domain([d3.min(cluster.map(dot => dot.y)), d3.max(cluster.map(dot => dot.y))])
                .range([0, height]);
                
            for (let [key, points] of Object.entries(clusterByNo)) {
                let hull = circles.append("path")
                    .attr("class", "hull")
                hull.datum(d3.polygonHull(points.map(dot => [x(dot.x), y(dot.y)])))
                    .attr("d", function (d) {
                        return "M" + d.join("L") + "Z";
                    })
                    .attr("fill", colorArray[key])
                    .attr("stroke", colorArray[key])
                    .attr("stroke-width", 15 + "px")
                    .attr("line-join", "rounded")
                    .attr("opacity", 0.3)
                    .attr("stroke-linejoin", "round")
                    .on("mouseover", () => {
                        hull.attr("fill", "gray")
                            .attr("stroke", "gray");
                    })
                    .on("mouseout", () => {
                        hull.attr("fill", colorArray[key])
                            .attr("stroke", colorArray[key]);
                    })
                    .on("click", () => console.log("attach redux to this, select cluster with id", key));
                this.createCluster(points, circles, r, div, x, y)
            }
        };

        select(node).call(zoom().scaleExtent([1, 4]).on("zoom", () => {
            circles.attr("transform", currentEvent.transform)
        }));

    }

    createCluster(points, node, r, div, x, y) {
        node.append("g")
            .selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", (d) => x(d.x))
            .attr("cy", (d) => y(d.y))
            .attr("r", r)
            .attr("fill", d => colorArray[d.cluster_no])
            .on("mouseover", (d) => {
                div.style("display", "inline-block")
                div.html(d.recipeName.title)
                    .style("left", (currentEvent.layerX + 20) + "px")
                    .style("top", (currentEvent.layerY - 3) + "px");
            })
            .on("mouseout", () => {
                setTimeout(() => {
                    div.style("display", "None");
                }, 300)
            })
            .on("click", (d) => console.log("attach redux to this, select recipe with id", d.recipeName));;
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
