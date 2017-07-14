import React from 'react'
import * as d3 from "d3";

export class Map extends React.Component {

    render() {
        let width = 360,
            height = 400;

        let svg = d3.select(".cluster").append("svg")
            .attr("width", width)
            .attr("height", height);

        return (
            <div className={"cluster"} style={{height: "409px", width: "564px"}}>cluster goes here</div>
        );
    }
}