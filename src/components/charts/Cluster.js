import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { select, event as currentEvent } from 'd3-selection'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import { hull } from 'd3-polygon'
import * as d3 from "d3";
import { colorArray, numbertocolor } from './svgColorTranslation' // used for colors

export class Clusters extends React.Component {
    constructor() {
        super()

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

    transform(t) {
        return function(d) {
          return "translate(" + t.apply(d) + ")";
        };
      }


    createMap() {
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

        let cluster = this.props.clusters.points
        let clusterByNo = {};
        cluster.map(d => clusterByNo[d.cluster_no] = clusterByNo[d.cluster_no] ? [...clusterByNo[d.cluster_no], d] : [d])
        console.log(clusterByNo)
        var x = d3.scaleLinear()
            .domain([d3.min(cluster.map(dot => dot.x)), d3.max(cluster.map(dot => dot.x))])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([d3.min(cluster.map(dot => dot.y)), d3.max(cluster.map(dot => dot.y))])
            .range([0, height]);

        for (let [key, points] of Object.entries(clusterByNo)) {
            console.log(key, points)
            if (!this.hull[key]) {
                this.hull[key] = this.circles.append("path")
                                 .attr("class", "hull"+key)
            }

            const scaledPoints = points.map(dot => [x(dot.x), y(dot.y)])
            const convexHull = (
                scaledPoints.length < 3 ?
                scaledPoints :
                d3.polygonHull(scaledPoints)
            )
            this.hull[key].datum(convexHull)
                .attr("d", function (d) {
                    return "M" + d.join("L") + "Z";
                })
                .attr("fill", colorArray[key])
                .attr("stroke", colorArray[key])
                .attr("stroke-width", 15 + "px")
                .attr("line-join", "rounded")
                .attr("opacity", this.props.activeCluster[key-1]? 0.3 : 0)
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
            this.circles.attr("transform", 
            currentEvent.transform
        )
        }));

    }

    createCluster(points, node, r, div, x, y,key) {
        let add = this.props.add;
        if (!this.circle[key]) {
            this.circle[key] = node.append("g")
                .selectAll("path")
                .data(points)
                .enter()
                .append("path")
        }


        this.circle[key]
            .attr('d', (d) => {
            return !this.props.clusters.centers.includes(d.recipe_id)? d3.symbol().type(d3.symbolCircle).size(40)() : d3.symbol().type(d3.symbolStar)()
            })
            .attr('transform',(d) => "translate(" + x(d.x) + "," + y(d.y) + ")")
            .attr("fill", (d) => (this.props.highlights.includes(d.recipe_id))?  'black' : colorArray[key])
            .attr("stroke", d =>{ 
                if(this.props.selectedRecipes.includes(d.recipe_id)) return '#767676'})
            .attr("stroke-width", d => this.props.selectedRecipes.includes(d.recipe_id)? .5 + "px": 0+'px')
            .attr("opacity", this.props.activeCluster[key-1]? 1 : 0.3)
            .on("mouseover",
                (d) => {
                select(currentEvent.target).attr('d', (d) => {
                    return !this.props.clusters.centers.includes(d.recipe_id)? d3.symbol().type(d3.symbolCircle).size(64)() : d3.symbol().type(d3.symbolStar).size(86)()
                    })
                if(this.props.activeCluster[key-1]){
                div.style("display", "inline-block")
                div.html(d.recipeName.title)
                    .style("left", (currentEvent.layerX + 30) + "px")
                    .style("top", (currentEvent.layerY - 3) + "px");
                }
            })
            .on("mouseout", (d) => {
                select(currentEvent.target).attr('d', (d) => {
                    return !this.props.clusters.centers.includes(d.recipe_id)? d3.symbol().type(d3.symbolCircle).size(40)() : d3.symbol().type(d3.symbolStar)()
                    })
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
                <div style={{position: "absolute", display:"none"}} className="ui left pointing basic label" ref={tooltip => this.tooltip = tooltip}/>
                <svg ref={node => this.node = node} />
            </div>
        );
    }
}
