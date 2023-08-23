// Sample data for the stacked bar plot
const data = [
  { category: "Category A", value1: 10, value2: 20, value3: 15 },
  { category: "Category B", value1: 15, value2: 5, value3: 25 },
  // Add more data entries
];// Set up the dimensions of the chart
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };// Create the SVG element
const svg = d3.select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);// Create the x and y scales
const xScale = d3.scaleBand()
  .domain(data.map(d => d.category))
  .range([0, width])
  .padding(0.1);const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value1 + d.value2 + d.value3)])
  .range([height, 0]);// Create the color scale for each segment
const color = d3.scaleOrdinal()
  .domain(["value1", "value2", "value3"])
  .range(["#66C2A5", "#FC8D62", "#8DA0CB"]);// Create the stacked data
const stackedData = d3.stack()
  .keys(["value1", "value2", "value3"])(data);// Create the bars
svg.selectAll(".bar")
  .data(stackedData)
  .enter().append("g")
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .enter().append("rect")
  .attr("x", d => xScale(d.data.category))
  .attr("y", d => yScale(d[1]))
  .attr("height", d => yScale(d[0]) - yScale(d[1]))
  .attr("width", xScale.bandwidth());// Add labels
svg.selectAll(".label")
  .data(data)
  .enter().append("text")
  .attr("class", "label")
  .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
  .attr("y", d => yScale(d.value1 + d.value2 + d.value3) - 5) // Adjust vertical position
  .attr("text-anchor", "middle")
  .text(d => d.value1 + d.value2 + d.value3);// Add x-axis
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale));// Add y-axis
svg.append("g")
  .call(d3.axisLeft(yScale));