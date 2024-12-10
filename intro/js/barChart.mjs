import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function barChart(
  selector,
  data,
  attributes = {
    width: 500,
    height: 300,
    margin: {
      top: 20,
      right: 20,
      bottom: 50,
      left: 50,
    },
  }
) {
  const { width, height, margin } = attributes;
  const svgBarChart = d3
    .select(selector)
    .append("svg")
    .attr("width", attributes.width)
    .attr("height", attributes.height);

  const xScale = d3
    .scaleBand()
    .domain(data.map((_, i) => i))
    .range([margin.left, width - margin.right])
    .padding(0.1); // 10% van de breedte van de bar

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - margin.bottom, margin.top]);

  svgBarChart
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat((d) => `Item ${d + 1}`));

  svgBarChart
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

  svgBarChart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (_, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - margin.bottom - yScale(d));

    const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

    svgBarChart.selectAll(".bar")
    .on("mouseover", function (event,d) {
        tooltip.style("visibility", "visible").text(`Waarde: ${d}`);
        d3.select(this).node().classList.add("active");
    })
    .on("mousemove", function(event) {
        tooltip.style("top", `${event.pageY - 10}px`).style("left", `${event.pageX + 10}px`)
    })
    .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
        d3.select(this).node().classList.remove("active");
    })
    
}
