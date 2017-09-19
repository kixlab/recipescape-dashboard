import * as d3 from "d3";
import { select, event as currentEvent} from 'd3-selection'
import React from 'react'


export class Tree extends React.Component {

    constructor(props) {

        super(props)
        this.createTree = this.createTree.bind(this)
    }

    componentDidMount() {
        this.createTree()
    }

    componentDidUpdate() {
        //we don't need to rerender on update...
        // this.createTree()
    }

    createTree() {
        let node = this.node;
        let width = this.props.width;
        let height = this.props.height;

        let tooltip = this.tooltip;
        let div = select(tooltip)

        let popUp = this.props.popUp



        let treeData = this.props.data;
        let margin = { top: 30, right: 20, bottom: 30, left: 20 };


        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        if(popUp) height = treeData.length*25

        let treemap = d3.tree()
            .size([width, height]);

        //  assigns the data to a hierarchy using parent-child relationships
        let nodes = d3.hierarchy(treeData);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg obgect to the body of the page

        let svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        let g = svg.append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")rotate(180 "+width/2 +" "+ height/2+")");

        // adds the links between the nodes
        g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                let y = 0
                !d.children ? y = d.y : y = d.y
                return "M" + d.x + "," + y
                    + "C" + d.x + "," + (y + d.parent.y) / 2
                    + " " + d.parent.x + "," + (y + d.parent.y) / 2
                    + " " + d.parent.x + "," + d.parent.y;
            });

        // adds each node as a group
        let node_tree = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                if(!d.children);
                return "node" +
                    (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                let y = 0
                !d.children ? y = d.y : y = d.y
                return "translate(" + d.x + "," + y + ")";
            });

        // adds the circle to the node
        node_tree.append("circle")
            .style("stroke", (d) => (d.children || d.data.children) ? "steelblue": "brown")
            // Last action does not have node children, but they should be displayed as other action
            .attr("r", 3)
            .on("mouseover", (d) => {
                if(popUp) div.style("display", "inline")
                div.html(d.data.name)
                    .style("left", (currentEvent.offsetX -5) + "px")
                    .style("top", (currentEvent.offsetY-5) + "px");
            })
            .on("mouseout", (d) => {
                setTimeout(() => {
                    div.style("display", "None");
                }, 300)
            })



        // adds the text to the node
        let treeT = node_tree.append("g")
            .attr("transform", function(d){
                return "rotate(180)"
            })
        treeT.append("text")
            .attr('opacity', popUp? 1 : 0)
            .attr("dy", ".30em")
            .attr("y", function (d) { return d.children ? 10 : -10; })
            .style("text-anchor", "middle")
            .text(function (d) { return d.data.name; })


    }


        render(){
            return(
                <div>
                    <svg ref={node => this.node = node} ></svg>
                    <div style={{ position: "absolute", display:'none'}} className="ui pointing below basic label" ref={tooltip => this.tooltip = tooltip} />
                </div>
            );
        }


    }
