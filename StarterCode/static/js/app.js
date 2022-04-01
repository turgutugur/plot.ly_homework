
// function to populate the meta data
function demoInfo(sample)
{
    console.log(sample);
    let data = d3.json("samples.json");
    console.log(data);
    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        // grab the meta data
        let metaData = data.metaData;
        // console.log(metaData);

        // filter based on the value of the sample (should return 1 result in an array)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);


        // access index 0 from the array
        let resultData = result[0];

        // clear the metadata
        d3.select("#sample-metadata").html("");  // clears the HTML out

        // use Object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            // add to the sample data / demographics section
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });

    });
}

// function to build bar chart
function buildBarChart(sample)
{
    console.log(sample);
    let data = d3.json("samples.json");
    console.log(data);

    d3.json("samples.json").then((data) => {
        // grab the sample data
        let sampleData = data.samples;

        // filter based on the value of the sample (should return 1 result in an array)
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);


        // access index 0 from the array
        let resultData = result[0];
        
        
        // get the otu_ids, labels and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // build the bar chart
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);

        let barChart = {
            x: xValues.reverse(),
            y: yticks.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };
        Plotly.newPlot("bar", [barChart], layout);
    }); 
}

// function to build the bubble chart
function buildBubbleChart(sample)
{
    // console.log(sample);
    // let data = d3.json("samples.json");
    // console.log(data);

    d3.json("samples.json").then((data) => {
        // grab the sample data
        let sampleData = data.samples;

        // filter based on the value of the sample (should return 1 result in an array)
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);


        // access index 0 from the array
        let resultData = result[0];
        
        
        // get the otu_ids, labels and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // build the bubble chart

        let bubbleChart = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", [bubbleChart], layout);
    }); 
}

// function that initializes the dashboard
function initialize()
{
    // load the date from the .json file
    // let data = d3.json("samples.json");
    // console.log(data);

    let data = d3.json("samples.json");
    console.log(data);

    // access the dropdown selector from the index.html
    var select = d3.select("#selDataset");

    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;  // made an array of the names
        // console.log(sampleNames);

        // use a foreach to create options for each sample in the selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
            
        });
        // when initialized, pass in the information for the first sample
        let sample1 = sampleNames[0];

        // call the function to build meta data
        demoInfo(sample1);
        // call function to build the bar chart
        buildBarChart(sample1);
        // call function to build the bubble chart
        buildBubbleChart(sample1);
    });

}

// function to update the dashboard
function optionChanged(item)
{
    // update to the metadata
    demoInfo(item);
    // call the function to build the bar chart
    buildBarChart(item);
    // call function to build the bubble chart
    buildBubbleChart(item);
}

// call the initialize function
initialize();
