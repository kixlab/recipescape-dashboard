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
        let width = this.props.width,
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

        height = Math.max(ry1,ry2)*lineHeight+2*padding


        //ensure that eclipes start at same height
        if(ry1 > ry2) {
            cy1 = y+(ry1-ry2);
            cy2 = y;
        }
        else {
            cy1 = y;
            cy2 = y+(ry2-ry1);
        }

        if (!this.svg) {
            this.svg = select(node)
                .attr("width", width + padding + padding)
                .attr("height", height + padding + padding)
                .append("g")
                .attr("transform", "translate(" + padding + "," + padding + ")")
        }


        //HANDLE ELLIPSES

        if(!this.g1)this.g1 = this.svg
            .append("g").append("ellipse")
            
        this.g1.attr("cx", cx1)
            .attr("cy", cy1)
            .attr("rx", rx1)
            .attr("ry", ry1)
            .style("fill", '#DB2828')
            .style("fill-opacity", ".5");
            
        if(!this.g2)this.g2 = this.svg.append("g").append("ellipse")
        this.g2.attr("cx", cx2)
            .attr("cy", cy2)
            .attr("rx", rx2)
            .attr("ry", ry2)
            .style("fill", '#2185D0')
            .style("fill-opacity", ".5");

        //HANDLE TEXT DISPLAY
        if(this.x) this.x.remove()
        this.x = this.svg.append("g")
        let text1 = this.x.selectAll("text").data(data.Recipe1.ingredients)
        
        text1.enter()
            .append("text")
            .text(d => d)
            .attr("x", cx1-padding)
            .attr("y", (d,i) => (cy1-ry1)+(i+1)*lineHeight)
            .style("fill", "black")
            .attr("text-anchor","middle");
        text1.exit().remove()
       
        if(this.z) this.z.remove()
            this.z = this.svg.append("g")
        let text2= this.z.selectAll("text").data(data.Recipe2.ingredients)
        text2.enter()
            .append("text")
            .text(d => d)
            .attr("x", cx2+padding)
            .attr("y", (d,i) => (cy1-ry1)+(i+1)*lineHeight)
            .style("fill", "black")
            .attr("text-anchor","middle");
        text2.exit().remove()
        

        if(this.t) this.t.remove()
        
        this.t = this.svg.append("g")

        let text3= this.t.selectAll("text").data(data.Intersection.ingredients)

        text3.enter()
            .append("text")
            .text(d => d)
            .attr("x", (cx1 + cx2)/2)
            .attr("y", (d,i) => (cy1-ry1)+(i+1.5)*(lineHeight)) // offset intersection by a bit
            .attr("text-anchor","middle")
            .style("fill", 'black');
        // text3.exit().remove();

        

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



