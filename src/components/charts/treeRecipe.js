import * as d3 from "d3";
import { layout } from 'd3';
import {
    select
} from 'd3-selection'
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
        this.createTree()
    }

    createTree() {
        let node = this.node;
        let width = this.props.width;
        let height = this.props.height;
        let treeData = this.props.data;
        let margin = { top: 30, right: 20, bottom: 30, left: 20 };
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;


        let treemap = d3.tree()
            .size([width, height]);

        //  assigns the data to a hierarchy using parent-child relationships
        let nodes = d3.hierarchy(treeData);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        let svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        let g = svg.append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")rotate(180 "+width/2 +" "+ height/2+")");

        // adds the links between the nodes
        let link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                return "M" + d.x + "," + d.y
                    + "C" + d.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + d.parent.y;
            });

        // adds each node as a group
        let node_tree = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" +
                    (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // adds the circle to the node
        node_tree.append("circle")
            .style("stroke", (d) => d.children ? "steelblue": "brown")
            .attr("r", 5);

        // adds the text to the node
        node_tree.append("g")
            .attr("transform", function(d){
                return "rotate(180)"
            // return "translate("+(d.x)+","+(d.y)+")rotate(180)translate("+(d.x)+","+(d.y)+")";
            })
            .append("text")
            .attr("dy", ".35em")
            .attr("y", function (d) { return d.children ? 15 : -15; })
            .style("text-anchor", "middle")
            .text(function (d) { return d.data.name; })

    }


        render(){
            return(
            <svg ref={node => this.node = node} ></svg>
            );
        }


    }