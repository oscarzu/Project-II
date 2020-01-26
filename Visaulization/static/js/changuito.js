// select the svg container first
let svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 1300)
    .attr('height', 900);

// create margins & dimensions
let margin = { top: 20, right: 20, bottom: 100, left: 100 };
let graphWidth = 1200 - margin.left - margin.right;
let graphHeight = 800 - margin.top - margin.bottom;

let graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// create axes groups
let xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`)

let yAxisGroup = graph.append('g');

let salesGraph = d3.json("/hybrid/2018").then(data => {
    console.log("HOLA")

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => item.Sales)])
        .range([graphHeight, 0]);

    let x = d3.scaleBand()
        .domain(data.map(item => item.State))
        .range([0, graphWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // join the data to circs
    let rects = graph.selectAll('rect')
        .data(data);

    // add attrs to circs already in the DOM
    rects.attr('width', x.bandwidth)
        .attr("height", d => graphHeight - y(item.Sales))
        .attr('fill', 'green')
        .attr('x', d => x(d.State))
        .attr('y', d => y(d.Sales));

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr("height", d => graphHeight - y(d.Sales))
        .attr('fill', 'orange')
        .attr('x', (d) => x(d.State))
        .attr('y', d => y(d.Sales));

    // create & call axes
    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-60)')
        .attr('text-anchor', 'end')
    yAxisGroup.call(yAxis);

}).catch(function(e) {
    console.log(e);
});