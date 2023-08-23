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
    // Create variables to hold arrays of feature values for 'Poisonous' and 'Safe' classes
    var valuesPoisonous = [];
    var valuesSafe = [];
  
    // Populate the arrays based on the class of each data point
    data.forEach(item => {
      if (item.class === 'p') {
        valuesPoisonous.push(item[selectedFeature]);
      } else if (item.class === 'e') {
        valuesSafe.push(item[selectedFeature]);
      }
    });
  
    var tracePoisonous = {
      x: valuesPoisonous,
      type: 'histogram',
      name: 'Poisonous',    
      marker: {
        color: 'purple',
      },
    };
  
    var traceSafe = {
      x: valuesSafe,
      type: 'histogram',
      name: 'Safe',
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