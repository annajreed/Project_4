fetch('../mushrooms_1.json') // Assuming 'mushrooms.json' is located one directory above
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
  fetch('../mushrooms_1.json')
    .then(response => response.json())
    .then(data => {
     buildCharts(selectedFeature, data);
     console.log(data)
    })

    .catch(error => console.error('Error fetching data:', error));
}



 function buildCharts(selectedFeature, data) {
    // Create variables to hold arrays of feature values for 'Poisonous' and 'Safe' classes
    var valuesPoisonous = [];
    var valuesSafe = [];
  
    // Populate the arrays based on the class of each data point
    data.forEach(item => {
      if (item.class === 'poisonous') {
        valuesPoisonous.push(item[selectedFeature]);
      } else if (item.class === 'safe') {
        valuesSafe.push(item[selectedFeature]);
      }
    });
  
    var tracePoisonous = {
      x: valuesPoisonous,
      type: 'histogram',
      name: 'Poisonous',
      opacity: 0.7,
      marker: {
        color: 'purple',
      },
    };
  
    var traceSafe = {
      x: valuesSafe,
      type: 'histogram',
      name: 'Safe',
      opacity: 0.7,
      marker: {
        color: 'green', 
      },
    };
  
    var layout = {
      title: `Histogram of ${selectedFeature} by Mushroom Class`,
      xaxis: {
        title: selectedFeature,
      },
      yaxis: {
        title: 'Frequency',
      },
      barmode: 'stack', // Overlay the histograms for comparison
    };
  
    // Update the "bar" plot with new data
    Plotly.newPlot('bar', [tracePoisonous, traceSafe], layout);
  }