import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


export default function circleChart(selector, data){
    const svg = d3.select(selector)
        .append('svg')
        .attr("width", 500)
        .attr('height', 300);

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => (i + 1) * 80)
    .attr("cy", 150)
    .attr("r", d => d.r /2)
    .attr("fill", d => d.color )

}