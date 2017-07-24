import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { line as d3Line } from 'd3-shape';


type Props = {
  data: any,
  height: number,
  width: number,
};


const Plot = ({data, height, width}:Props) => {


    return(
        <svg
        className="plot"
        height={height}
        width={width}
        ><g>
            {data.map((line,index) => <Line key={index}linePath={line.plot} color={line.clusterColor} height={height} width={width}/>)}
        </g>
        </svg>
    );
};

const Line = ({linePath, height, width, color}) => {

    let selectX = d => d[0]
    let selectY = d => d[1]

    const xScale = d3ScaleLinear()
    .domain(d3ArrayExtent(linePath, selectX))
    .range([0, width]);

    const yScale = d3ScaleLinear()
    .domain(d3ArrayExtent(linePath, selectY))
    .range([height, 0]);

    const selectScaledX = datum => xScale(selectX(datum));
    const selectScaledY = datum => yScale(selectY(datum));

    const plot= d3Line()
    .x(selectScaledX)
    .y(selectScaledY)

    return(
        <path d={plot(linePath)} 
            fill={"transparent"}
            stroke={color}
            strokeWidth={1}
            strokeLinejoin={"round"}
        />
    );
}

export default Plot;




