import * as d3 from "d3";
import { select} from 'd3-selection'
import React from 'react'
import {SVGColors} from './svgColorTranslation'

export class UnionGraph extends React.Component {

    constructor(props){
        super(props)
        this.buildUnionGraph = this.buildUnionGraph.bind(this)
    }

    componentDidMount() {
        this.buildUnionGraph()
    }

    componentDidUpdate() {
        this.buildUnionGraph()
    }


    buildUnionGraph(){
        //assumed structureing of data
        let dummydata = {recipe1: ['boil', 'mix', 'chop', "oil"], recipe2: ['oil', 'mix', 'stirr', 'fry']}
        let node = this.node;
        let width = this.props.width;
        let height = this.props.height;
        let margin = { top: 40, right: 20, bottom: 30, left: 20 };


        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        this.createLinks(node, width, dummydata.recipe1, dummydata.recipe2);  
        this.addOneRecipe(node, dummydata.recipe1 ,width, 'L', SVGColors['blue']);
        this.addOneRecipe(node, dummydata.recipe2 ,width, 'R', SVGColors['red']);
                     


    }

    getXPos(pos, width){
        switch(pos){
            case "L": 
                return 1/3*width;
                break;
            case "R": return 2/3*width;
                break;
        }
    }

    addOneRecipe(node, data, width, pos, color){
        let distance = 30;
        let topOffset = 30;
        let innerLinks = [];
        let prev = 0;
        let xPos = this.getXPos(pos, width)
        let g = select(node).append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data)
            .enter()
            g.append("circle")
            .attr("r", 6)
            .attr("cx", (d)=> xPos)
            .attr("cy", (d,i) => {
                if(i !== 0) innerLinks.push({ySource: prev, yTarget: (i+1) * distance})
                prev = topOffset+ (i+1) * distance 
               return prev;
            })
            .attr("fill", color)
            .attr("class", (d, i) => i);

            g.append("text")
            .text((d) => d)
            .attr("color", "black")
            .attr("x", (d) => this.getXPos(pos, width) + (pos == 'L' ? -50 : 20))
            .attr("y", (d,i) => topOffset+(i+1)*distance)

        select(node).append("g")
                .selectAll("line")
                .data(innerLinks)
                .enter().append("line")
                .attr("z", 1)
                .attr("x1", (d) => xPos)
                .attr("y1", (d, i) => d.ySource)
                .attr("x2", (d) => xPos)
                .attr("y2", (d) => d.yTarget)
                .style("stroke", color)
    }

    getInbetweenLinks(recipe1, recipe2){
        let unionLinks = [];
        recipe1.forEach( (instruction1, index1) => {
            recipe2.forEach((instruction2, index2) => {
                if(instruction1 == instruction2)
                    unionLinks.push({recipe1: index1+1, recipe2: index2+1});
            })
        });
        return unionLinks;
    }

    createLinks(node, width, recipe1, recipe2){
        let unionLinks = this.getInbetweenLinks(recipe1, recipe2)
        select(node).append("g")
                .selectAll("line")
                .data(unionLinks)
                .enter().append("line")
                .attr("x1", (d) => this.getXPos('L', width))
                .attr("y1", (d, i) => 30+d.recipe1*30)
                .attr("x2", (d) => this.getXPos('R', width))
                .attr("y2", (d) => 30+d.recipe2*30)
                .style("stroke", SVGColors['grey'])
    }

    render(){
        return(
            <svg ref={node => this.node = node}/>
        );
    }


}