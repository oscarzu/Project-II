// Submit Button handler
function handleSubmit() {
    // @TODO: YOUR CODE HERE
    // Prevent the page from refreshing
    d3.event.preventDefault();
    d3.event.stopPropagation();

    // Select the input value from the form

    let selectedyear = d3.select("#yearInput").property("value");
    buildPlot(selectedyear);
    // clear the input value
    d3.select("#yearInput").property("value", "");
    // Build the plot with the new stock
}

function buildPlot(selectedyear) {
    //var apiKey = "zU1pxEgxHRwdciAup7z8";

    //var url = `https://www.quandl.com/api/v3/datasets/WIKI/${selectedyear}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;
    console.log(selectedyear)
    d3.json(`/sales/${selectedyear}`).then(function(data) {
        console.log(data);
        // Grab values from the response json object to build the plots
        var brand = data.map(d => d.Brand);
        var selectedyear = data.map(d => d.Year);
        var salesofyear = data.map(d => d.Sales);
        // var startDate = data.dataset.start_date;
        // var endDate = data.dataset.end_date;
        // Print the names of the columns

        // Print the data for each day

        // Use map() to build an array of the the dates
        //var dates = data.dataset.data.map(row => [0]);
        // Use map() to build an array of the closing prices
        //var closingPrices = data.dataset.data.map(row => row[4]);

        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: brand,
            x: brand,
            y: salesofyear,
            line: {
                color: "#17BECF"
            }
        };

        var datos = [trace1];

        var layout = {
            title: `${selectedyear[0]} Sales`,
            // xaxis: {
            //    range: [startDate, endDate],
            //   type: "date"
            //},
            //yaxis: {
            //  autorange: true,
            //type: "linear"
            // }
        };

        Plotly.newPlot("plot", datos, layout);

    });
}

// Add event listener for submit button
// @TODO: YOUR CODE HERE
//d3.select("#yearInput").on("change", d => console.log(d));

d3.select("#yearInput").on("change", handleSubmit);





/////////////////////////////////////////esta es de prueba//////////////////////////77
/*  var exampleplot = [{
     x: ['giraffes', 'orangutans', 'monkeys'],
     y: [20, 14, 23],
     type: 'bar'
 }];

 Plotly.newPlot('plot', exampleplot); */