export const SVGColors = {
    red: "#B03060",
    orange: "#FE9A76",
    yellow: "#FFD700",
    olive: "#32CD32",
    green: "#016936",
    teal: "#008080",
    blue: "#0E6EB8",
    violet: "#EE82EE",
    purple: "#B413EC",
    pink: "#FF1493",
    brown: "#A52A2A",
    grey: "#A0A0A0",
}



export const colorArray = Object.keys(SVGColors).map(key => SVGColors[key]);
export const numbertocolor = Object.keys(SVGColors).map(key => key);
