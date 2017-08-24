import React from 'react'
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { select, event as currentEvent } from 'd3-selection'
import { line as d3Line } from 'd3-shape';
import * as d3 from "d3";
// import {event as currentEvent} from 'd3-selection';
import { SVGColors } from './svgColorTranslation'


class Plot extends React.Component {

    constructor(props) {
        super(props)
        this.createPlot = this.createPlot.bind(this)
    }

    componentDidMount() {
        this.createPlot()
    }

    componentDidUpdate() {
        this.createPlot()
    }

    createPlot() {

        let node = this.node;
        let tooltip = this.tooltip;
        let data = this.props.data;
        let div = select(tooltip)
        let trans = d3.transition().duration(1000).ease(d3.easeLinear);

        let margin = { top: 10, right: 10, bottom: 20, left: 10 };
        let width = this.props.width - margin.left - margin.right;
        let height = this.props.height - margin.top - margin.bottom;

        if (!this.svg) {
            this.svg = select(node)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        let x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        x.domain(data.map((d, i) => i + 1));

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data)]);

        this.bar = this.svg.selectAll(".bar")
            .data(data)
        console.log(data)

        //ENTER
        this.bar.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i + 1))
            .attr("width", x.bandwidth())
            .attr("y", (d, i) => height)
            .attr("height", d => 0)
            .attr('opacity', 0.7)
            .style("fill", "url(#linear-gradient)")
            .transition(trans)
            .attr("y", (d, i) => y(d))
            .attr("height", (d) => height - y(d));

        //UPDATE
        this.bar
            .transition(trans)
            .attr("y", (d, i) => y(d))
            .attr("height", d => height - y(d))
            .style("fill", "url(#linear-gradient)")



        
        // add the x Axis
        if(!this.axis){
        this.axis = this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        }

        this.bar
            .exit()
            .remove();
          
        // add the y Axis
        // svg.append("g")
        //     .call(d3.axisLeft(y));
          
        
        let line = d3.line()
        .x(function (d,i) { return x(i+1)+x.bandwidth()/2; }) 
        .y(function (d,i) { return y(d); })
        .curve(d3.curveMonotoneX)


        if(this.props.overlayData.length != 0){
            this.props.overlayData.then(data =>{

            if(!this.path) this.path = this.svg.append("path")
                this.path.datum(data, d => d)
                .transition(trans)
                .attr("class", "line")
                .attr("d", line)
                .style("stroke", 'black')
                .style("fill", "none")
                .style("stroke-width", 1.5)
            
            })
        } else {
            select(node).selectAll('.line').remove();
            this.path = undefined;
        }






    }


    render(){
        return(
        <div>
             <div style={{position: "absolute", display: "None"}} className="ui left pointing basic label" ref={tooltip => this.tooltip = tooltip}/> 
            <svg ref={node => this.node = node} >
            <linearGradient id="linear-gradient" gradientTransform="rotate(90)">
                {this.props.colors.map((d,i) => <stop key={d} offset={i/this.props.colors.length} stopColor={d}></stop>)
                }
            </linearGradient>
            </svg>
        </div>
        );
    }

}




export default Plot;




