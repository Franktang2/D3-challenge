function initial() {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 120
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .classed("chart", true)
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3: Import the data

  d3.csv("assets/data/data.csv").then(function(stateData) {

// Step 4: Format the data

    console.log(stateData);

    stateData.forEach(function(data) {
        data.abbr = data.abbr;
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
    } )

 // Step 5: Create Scales
    
      console.log(d3.max(stateData.map(d => d.poverty)));

    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(stateData, d => d.poverty))
        .range([0, width]);

    var yLinearScale1 = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.obesity)])
        .range([height, 0]);
    

// Step 6: Create Axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis1 = d3.axisLeft(yLinearScale1);

    

// Step 7: Append the axes to the chartGroup 

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    
    chartGroup.append("g")
      .call(leftAxis1);    

 // Step 8: Create scatter plot graph

 
 chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale1(d.obesity))
    .attr("r", "10")
    .attr("fill", "orange");
 

  
  // Step 9: Adding state abbreviation to circles
  
  chartGroup.selectAll('.stateText')
      .data(stateData)
      .enter()
      .append('text')
      .classed('stateText', true)
      .attr('x', d => xLinearScale(d.poverty))
      .attr('y', d => yLinearScale1(d.obesity))
      .attr('dy', 3)
      .attr('font-size', '10px')
      .text(function(d){return d.abbr});
  


// Step 10: adding Y and x axis labels

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 40)
    .attr("x", 0 -250)
    .attr("class", "axisText")
    .text("Obesity (%)");


  chartGroup.append("text")
    .attr("transform", `translate(${width - 450}, ${height + margin.top + 20 })`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
   

      })}
    

initial();
