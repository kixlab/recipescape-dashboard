//use to convert from semantic ui colors to hex
export const SVGColors = {
    red: "#DB2828",
    orange: "#F2711C",
    yellow: "#FBBD08",
    olive: "#B5CC18",
    green: "#21BA45",
    teal: "#00B5AD",
    blue: "#2185D0",
    violet: "#6435C9",
    purple: "#A333C8",
    pink: "#E03997",
    brown: "#A5673F",
    grey: "#767676",
}

//use to convert from cluster number to hex color
export const colorArray = Object.keys(SVGColors).map(key => SVGColors[key]); 

//use to convert from clusternumber to color name
export const numbertocolor = Object.keys(SVGColors).map(key => key);
