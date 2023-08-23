fetch('../mushrooms.json') // Assuming 'mushrooms.json' is located one directory above
  .then(response => response.json())
  .then(data => {
    const dropdownMenu = d3.select("#selFeature");

    // Get the list of mushroom features (excluding 'class')
    const features = Object.keys(data[0])
    .filter(feature => feature !== 'class')

    // Populate the dropdown menu with options
    dropdownMenu
      .selectAll("option")
      .data(features)
      .enter()
      .append("option")
      .text(feature => feature)
      .attr("value", feature => feature);

   // Call the optionChanged function with the initial value
  optionChanged(features[0]);
  });

  // Define the optionChanged function
function optionChanged(selectedFeature) {
  // Fetch data again and call buildCharts with the selected feature
  fetch('../mushrooms.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => console.error('Error fetching data:', error));
}

const explanations = {
  'cap-shape': 'bell=b, conical=c, convex=x, flat=f, knobbed=k, sunken=s',
  'cap-surface': 'fibrous=f, grooves=g, scaly=y, smooth=s',
  'cap-color': 'brown=n, buff=b, cinnamon=c, gray=g, green=r, pink=p, purple=u, red=e, white=w, yellow=y',
  'bruises': 'bruises=t, no=f',
  'odor': 'almond=a, anise=l, creosote=c, fishy=y, foul=f, musty=m, none=n, pungent=p, spicy=s',
  'gill-attachment': 'attached=a, descending=d, free=f, notched=n',
  'gill-spacing': 'close=c,crowded=w,distant=d',
  'gill-size': 'broad=b,narrow=n',
  'gill-color':'black=k,brown=n,buff=b,chocolate=h,gray=g, green=r,orange=o,pink=p,purple=u,red=e,white=w,yellow=y',
  'stalk-shape':'enlarging=e,tapering=t',
  'stalk-root':'bulbous=b,club=c,cup=u,equal=e,rhizomorphs=z,rooted=r,missing=?',
  'stalk-surface-below-ring': 'fibrous=f,scaly=y,silky=k,smooth=s',
  'stalk-color-above-ring': 'brown=n,buff=b,cinnamon=c,gray=g,orange=o,pink=p,red=e,white=w,yellow=y',
  'stalk-color-below-ring': 'brown=n,buff=b,cinnamon=c,gray=g,orange=o,pink=p,red=e,white=w,yellow=y',
  'veil-type': 'partial=p,universal=u',
  'veil-color': 'brown=n,orange=o,white=w,yellow=y',
  'ring-number': 'none=n,one=o,two=t',
  'ring-type': 'cobwebby=c,evanescent=e,flaring=f,large=l,none=n,pendant=p,sheathing=s,zone=z',
  'spore-print-color': 'black=k,brown=n,buff=b,chocolate=h,green=r,orange=o,purple=u,white=w,yellow=y',
  'population': 'abundant=a,clustered=c,numerous=n,scattered=s,several=v,solitary=y',
  'habitat': 'grasses=g,leaves=l,meadows=m,paths=p,urban=u,waste=w,woods=d'
};

function optionChanged(selectedFeature) {
  
  fetch('../mushrooms.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      buildCharts(selectedFeature, data);

      // Update the explanation
      let explanationText = explanations[selectedFeature];
      let explanationElement = document.getElementById('explanation');
      explanationElement.textContent = explanationText;
    })
    .catch(error => console.error('Error fetching data:', error));
 }

function buildCharts(selectedFeature, data) {
  // Create arrays to hold counts for 'Poisonous' and 'Safe' classes
  var countsPoisonous = Array(data.length).fill(0);
  var countsSafe = Array(data.length).fill(0);
  // var countp = 0 
  // var countsS = 0
  console.log(countsPoisonous)
  console.log(countsSafe)
  
  // Iterate through each data point and update the counts
  data.forEach((item, index) => {
    if (item.class === 'p') {
      // countp = countp + 1
    
      countsPoisonous[index] = countsPoisonous[index] + 1;
      countsP = countsPoisonous.filter((i)=> i==1);
      console.log(index)
      console.log(countsPoisonous)
    } else if (item.class === 'e') {
      countsSafe[index] = countsSafe[index] + 1;
      countsS = countsSafe.filter((i)=> i==1);
      // countsS = countsS + 1
    }
  }
  );

  var tracePoisonous = {
    x: countsPoisonous,
    y: data.map(item => item[selectedFeature]),
    type: 'bar',
    orientation: 'h',
    name: 'Poisonous',
    marker: {
      color: 'purple'
    },
    text: countsP.length
  };
  
  var traceSafe = {
    x: countsSafe,
    y: data.map(item => item[selectedFeature]),
    type: 'bar',
    orientation: 'h',
    name: 'Safe',
    marker: {
      color: 'green'
    },
    text: countsS.length
  };

  var layout = {
    title: `Bar Chart of ${selectedFeature} by Mushroom Class`,
    barmode: 'stack'
  };
  // Update the "bar" plot with new data
  Plotly.newPlot('bar', [tracePoisonous, traceSafe], layout);
}


// svg.selectAll(".text")        
//   .data(data)
//   .enter()
//   .append("text")
//   .attr("class","label")
//   .attr("x", (function(d) { return x(d.date); }  ))
//   .attr("y", function(d) { return y(d.value) - 20; })
//   .attr("dy", ".75em")
//   .text(function(d) { return d.value; });






// Sample data for the stacked bar plot
// const data = [
//   { category: "Category A", value1: 10, value2: 20, value3: 15 },
//   { category: "Category B", value1: 15, value2: 5, value3: 25 },
//   // Add more data entries
// ];// Set up the dimensions of the chart
// const width = 400;
// const height = 300;
// const margin = { top: 20, right: 20, bottom: 30, left: 40 };// Create the SVG element
// const svg = d3.select("#chart-container")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);// Create the x and y scales
// const xScale = d3.scaleBand()
//   .domain(data.map(d => d.category))
//   .range([0, width])
//   .padding(0.1);const yScale = d3.scaleLinear()
//   .domain([0, d3.max(data, d => d.value1 + d.value2 + d.value3)])
//   .range([height, 0]);// Create the color scale for each segment
// const color = d3.scaleOrdinal()
//   .domain(["value1", "value2", "value3"])
//   .range(["#66C2A5
// ", "#FC8D62
// ", "#8DA0CB
// "]);// Create the stacked data
// const stackedData = d3.stack()
//   .keys(["value1", "value2", "value3"])(data);// Create the bars
// svg.selectAll(".bar")
//   .data(stackedData)
//   .enter().append("g")
//   .attr("fill", d => color(d.key))
//   .selectAll("rect")
//   .data(d => d)
//   .enter().append("rect")
//   .attr("x", d => xScale(d.data.category))
//   .attr("y", d => yScale(d[1]))
//   .attr("height", d => yScale(d[0]) - yScale(d[1]))
//   .attr("width", xScale.bandwidth());// Add labels
// svg.selectAll(".label")
//   .data(data)
//   .enter().append("text")
//   .attr("class", "label")
//   .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
//   .attr("y", d => yScale(d.value1 + d.value2 + d.value3) - 5) // Adjust vertical position
//   .attr("text-anchor", "middle")
//   .text(d => d.value1 + d.value2 + d.value3);// Add x-axis
// svg.append("g")
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(xScale));// Add y-axis
// svg.append("g")
//   .call(d3.axisLeft(yScale));