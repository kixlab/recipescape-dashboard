//Will Construct A venn Diagram with data
data = {
    Recipe1 : {ingredients : ["tomato", "pepper", "sugar", "garlic", "olives","of","ingredients"] },
    Intersection: {ingredients : ["salt", "pasta", "beef", "onions", "it", "will", "adapt", "it", "more"]},
    Recipe2 :  {ingredients : ["a", "lot","of","ingredients"]
    },
};
var svg = d3.selectAll("svg");
var width = 360,
    height = 400;

//Constants
var lineHeight = 30;
var padding = 20;
var spreadValue = .525; //servers to mak ellipse look nice
var y = 200


//CALCULATIONS for DIFFERENT VARIABLES
var rx1 = width/3-padding; //devide space into 3 sections
var rx2 = width/3-padding;

var ry1 = Math.max(data.Recipe1.ingredients.length, 
                    data.Intersection.ingredients.length+1) * lineHeight*spreadValue;
var ry2 = Math.max(data.Recipe2.ingredients.length, 
                    data.Intersection.ingredients.length+1) * lineHeight*spreadValue;
var cx1 = width/3;
var cx2 = width/3*2;


//ensure that eclipes start at same height
if(ry1 > ry2) {
    cy1 = y+(ry1-ry2);
    cy2 = y;
}
else {
    cy1 = y;
    cy2 = y+(ry2-ry1);
}


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

//HANDLE ELLIPSES

var g1 = d3.selectAll("svg")
    .append("g");
    g1.append("ellipse")
    .attr("cx", cx1)
    .attr("cy", cy1)
    .attr("rx", rx1)
    .attr("ry", ry1)
    .style("fill", "brown")
    .style("fill-opacity", ".5");
    
var g2 = svg.append("g");
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

svg.append("g").selectAll("text").data(data.Intersection.ingredients)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", (cx1 + cx2)/2)
    .attr("y", (d,i) => (cy1-ry1)+(i+1.5)*(lineHeight)) // offset intersection by a bit
    .attr("text-anchor","middle")
    .style("fill", "#4D3848");
