import React from 'react'
import { select, event as currentEvent } from 'd3-selection'
import { zoom } from 'd3-zoom';
import * as d3 from "d3";
import { colorArray, numbertocolor } from './svgColorTranslation' // used for colors
import { Icon, List } from 'semantic-ui-react'

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
        d3.select(".clusters").selectAll("*").remove()
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

        this.svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        this.circles = this.svg.append("g")
            .attr("class", "circles")
            .attr('transform', this.transform)


        //get cluster into correct format
        let cluster = this.props.points
        let clusterByNo = {};
        cluster.map(d => clusterByNo[d.cluster_no] = clusterByNo[d.cluster_no] ? [...clusterByNo[d.cluster_no], d] : [d])

        //define scaling
        var x = d3.scaleLinear()
            .domain([d3.min(cluster.map(dot => dot.x)), d3.max(cluster.map(dot => dot.x))])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([d3.min(cluster.map(dot => dot.y)), d3.max(cluster.map(dot => dot.y))])
            .range([0, height]);


        //for each cluster
        for (let [key, points] of Object.entries(clusterByNo)) {
            this.hull[key] = this.circles.append("path")
                .attr("class", "hull" + key)

            const scaledPoints = points.map(dot => [x(dot.x), y(dot.y)])
            const convexHull = (
                scaledPoints.length < 3 ?
                    scaledPoints :
                    d3.polygonHull(scaledPoints)
            )
            //Draw Hull
            this.hull[key].datum(convexHull)
                .attr("d", function (d) {
                    return "M" + d.join("L") + "Z";
                })
                .attr("fill", colorArray[key])
                .attr("stroke", colorArray[key])
                .attr("stroke-width", 15 + "px")
                .attr("line-join", "rounded")
                .attr("opacity", this.props.activeCluster[key] ? 0.3 : 0)
                .attr('visibility', this.props.activeCluster[key] ? 'visible' : 'hidden')
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


        }

        //Draw points (must not be overlayed by cluster)
        for (let [key, points] of Object.entries(clusterByNo)) {
            this.createCluster(points, this.circles, r, div, x, y, key)
        }

        select(node).selectAll('.first').raise()

        //DEFINE ZOOM
        let zooms = zoom().scaleExtent([1, 5]).on("zoom", () => {
            this.transform = currentEvent.transform;
            this.circles.attr("transform",
                currentEvent.transform)

            //for semantic zoom
            for (let [key, points] of Object.entries(clusterByNo)) {
                this.currentTransform = currentEvent.transform.k
                this.circle[key].attr('transform', (d) => "translate(" + x(d.x) + "," + y(d.y) + ")" + 'scale(' + 1 / currentEvent.transform.k + ')')
            }
        })

        //HANDLE ZOOM
        select(node).call(zooms);

        select('#zoom-in').on('click', function () {
            zooms.scaleBy(select(node).transition().duration(750), 1.3);
        });

        select('#zoom-out').on('click', function () {
            zooms.scaleBy(select(node).transition().duration(750), 1 / 1.3);
        });

    }

    //handle drawings of circles for one cluster
    createCluster(points, node, r, div, x, y, key) {
        let add = this.props.add;
        this.circle[key] = node.append("g")
            .selectAll("path")
            .data(points)
            .enter()
            .append("path")


        return this.circle[key]
            .attr('d', (d) => !this.props.centers.includes(d.recipe_id) ? d3.symbol().type(d3.symbolCircle).size(30)() : d3.symbol().type(d3.symbolStar)())
            .attr('transform', (d) => (this.currentTransform) ? "translate(" + x(d.x) + "," + y(d.y) + ")" + 'scale(' + 1 / this.currentTransform + ')' : "translate(" + x(d.x) + "," + y(d.y) + ")")
            .attr("fill", (d) => (this.props.highlights.includes(d.recipe_id)) ? 'black' : colorArray[key])
            .classed('first', (d) => this.props.highlights.includes(d.recipe_id))
            .attr("stroke", d => {
                let color = ';'
                if (this.props.centers.includes(d.recipe_id)) { color = 'white'; }
                if (this.props.selectedRecipes.includes(d.recipe_id)) { color = 'black' }
                return color
            })
            .attr("stroke-width", d => this.props.selectedRecipes.includes(d.recipe_id) ? .5 + "px" : .5 + 'px')
            .attr("opacity", this.props.activeCluster[key] ? 1 : 0.3)
            .on("mouseover",
            (d) => {
                select(currentEvent.target).attr('d', (d) => {
                    return !this.props.centers.includes(d.recipe_id) ? d3.symbol().type(d3.symbolCircle).size(64)() : d3.symbol().type(d3.symbolStar).size(86)()
                })
                if (this.props.activeCluster[key]) {
                    div.style("display", "inline-block")
                    div.html(d.recipeName.title)
                        .style("left", (currentEvent.layerX + 30) + "px")
                        .style("top", (currentEvent.layerY - 3) + "px");
                }
            })
            .on("mouseout", (d) => {
                select(currentEvent.target).attr('d', (d) => {
                    return !this.props.centers.includes(d.recipe_id) ? d3.symbol().type(d3.symbolCircle).size(30)() : d3.symbol().type(d3.symbolStar)()
                })
                setTimeout(() => {
                    div.style("display", "None");
                }, 300)
            })
            .on("click", function (d) {
                add(d.recipe_id)
            })

    }


    render(){
        
        return(
            <div style={{overflow: "auto"}}>
                <List style={{ position: "absolute" }}>
                    <List.Item><Icon style={{cursor: 'pointer'}} circular size='small' id={'zoom-in'} name={'plus'} /></List.Item>
                    <List.Item><Icon style={{cursor: 'pointer'}} circular size='small' id={'zoom-out'} name={'minus'} /></List.Item>
                </List>
                <div style={{position: "absolute", display:"none"}} className="ui left pointing basic label" ref={tooltip => this.tooltip = tooltip}/>
                <svg ref={node => this.node = node} className={'clusters'}/>
            </div>
        );
    }
}
