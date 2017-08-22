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
        let trans = d3.transition().duration(750);

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
            .data(this.props.data)

        //EXIT
        this.bar
            .exit()
            .remove();

        //ENTER
        this.bar.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i + 1))
            .attr("width", x.bandwidth())
            .attr("y", (d, i) => y(d))
            .attr("height", d => height - y(d))
            .attr('opacity', 0.7)
            .style("fill", "url(#linear-gradient)")

        //UPDATE
        this.bar.select("rect")
            .transition(trans)
            .style("fill", "url(#linear-gradient)")
            .attr("height", (d) => height - y(d));

        
        // add the x Axis
        if(!this.axis){
        this.axis = this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        }

        // this.bar
        //     .exit()
        //     .remove();
          
            // add the y Axis
            // svg.append("g")
            //     .call(d3.axisLeft(y));
          
        

        //to replace later
        // let dataset = d3.range(10).map(function(d, i) { return {"x": i, "y": d3.randomUniform(10)() } })
        // let minX, maxX, x, y;
        // this.props.data.forEach((data => {

        //     let line = d3.line()
        //     .x(function (d) { return x(d[0]); }) // set the x values for the line generator
        //     .y(function (d) { return y(d[1]); }) // set the y values for the line generator 
        //     .curve(d3.curveMonotoneX)

        //     minX = d3.min(data.plot.map(d=> d[0]));
        //     maxX = d3.max(data.plot.map(d=> d[0]));

        //     x = d3.scaleLinear()
        //     .domain([minX, maxX])
        //     .range([0, width]);

        //     y = d3.scaleLinear()
        //     .domain([d3.min(data.plot.map(d=> d[1])), d3.max(data.plot.map(d=> d[1]))])
        //     .range([height, 0]);

        // svg.append("path")
        //     .datum(data.plot)
        //     .attr("class", "line")
        //     .attr("d", line)
        //     .style("stroke", SVGColors[data.clusterColor])
        //     .style("fill", "none")
        //     .style("stroke-width", 1.5)

        // }), this);


        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x).tickValues([minX,maxX/2, maxX]).tickFormat((d, i) => ['beginning', 'middle', 'end'][i]))
        //     .attr("class", "axis")


        // svg.append("g")
        //     .call(d3.axisLeft(y).ticks(0).tickSize(0))
        //     .attr("class", "axis")
        //     .on("mouseover", () => {
        //         div.style("display", "inline-block")
        //         div.html("relative occurence in recipe")
        //             .style("left", (currentEvent.offsetX + 10) + "px")
        //             .style("top", (currentEvent.offsetY + 50) + "px");
        //     })
        //     .on("mouseout", () => {
        //         setTimeout(() =>{
        //             div.style("display", "None");
        //         }, 400)
        //     });


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




