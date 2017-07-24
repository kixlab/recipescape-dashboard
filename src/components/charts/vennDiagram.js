import * as d3 from "d3";
import { select } from 'd3-selection'
import React from 'react'
//Will Construct A venn Diagram with data

export class VennDiagram extends React.Component {
    constructor(props){
        super(props)
        this.createVenn = this.createVenn.bind(this)
    }

    componentDidMount(){
        this.createVenn()
    }

    componentDidUpdate() {
        this.createVenn()
    }

    createVenn(){
        const node = this.node;
        //replace with default prameters
        const width = this.props.width,
        height = this.props.height,
        data = this.props.data;


        const lineHeight = 30, 
        padding = 20, 
        spreadValue = .525, //servers to mak ellipse look nice
        y = 200;


    //CALCULATIONS for DIFFERENT VARIABLES
        let rx1 = width/3-padding; //devide space into 3 sections
        let rx2 = width/3-padding;

        let ry1 = Math.max(data.Recipe1.ingredients.length, 
                            data.Intersection.ingredients.length+1) * lineHeight*spreadValue;
        let ry2 = Math.max(data.Recipe2.ingredients.length, 
                            data.Intersection.ingredients.length+1) * lineHeight*spreadValue;
        let cx1 = width/3, cx2 = width/3*2;
        let cy1, cy2;


        //ensure that eclipes start at same height
        if(ry1 > ry2) {
            cy1 = y+(ry1-ry2);
            cy2 = y;
            console.log("ha")
        }
        else {
            cy1 = y;
            cy2 = y+(ry2-ry1);
            console.log("ha")
        }


        //HANDLE ELLIPSES

        let g1 = select(node)
            .append("g");
            g1.append("ellipse")
            .attr("cx", cx1)
            .attr("cy", cy1)
            .attr("rx", rx1)
            .attr("ry", ry1)
            .style("fill", "brown")
            .style("fill-opacity", ".5");
            
        let g2 = select(node).append("g");
            g2.append("ellipse")
            .attr("cx", cx2)
            .attr("cy", cy2)
            .attr("rx", rx2)
            .attr("ry", ry2)
            .style("fill", "steelblue")
            .style("fill-opacity", ".5");

        //HANDLE TEXT DISPLAY

        g1.selectAll("text").data(data.Recipe1.ingredients)
            .enter()
            .append("text")
            .text(d => d)
            .attr("x", cx1-padding)
            .attr("y", (d,i) => (cy1-ry1)+(i+1)*lineHeight)
            .style("fill", "#4D1313")
            .attr("text-anchor","middle");

        g2.selectAll("text").data(data.Recipe2.ingredients)
            .enter()
            .append("text")
            .text(d => d)
            .attr("x", cx2+padding)
            .attr("y", (d,i) => (cy1-ry1)+(i+1)*lineHeight)
            .style("fill", "#274863")
            .attr("text-anchor","middle");

        select(node).append("g").selectAll("text").data(data.Intersection.ingredients)
            .enter()
            .append("text")
            .text(d => d)
            .attr("x", (cx1 + cx2)/2)
            .attr("y", (d,i) => (cy1-ry1)+(i+1.5)*(lineHeight)) // offset intersection by a bit
            .attr("text-anchor","middle")
            .style("fill", "#4D3848");

    }
        render(){
        return(
            <svg 
            height={this.props.height}
            width ={this.props.width}
            ref={node => this.node = node} ></svg>
        );
    }
}
//Constants



