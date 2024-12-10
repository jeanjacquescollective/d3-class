export default function createBarChart(
  selector,
  width,
  height,
  barColor,
  tooltipSelector = ".tooltip"
) {
  const tooltip = d3.select(tooltipSelector);
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svgCanvas = d3
    .select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g").attr("transform", `translate(${margin.left}, ${margin.bottom})`)
    ;

  const xScale = d3.scaleBand().range([0, innerWidth]).padding(0.1);
  const yScale = d3.scaleLinear().range([innerHeight, 0]);

  const xAxisGroup = svgCanvas
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`);

  const yAxisGroup = svgCanvas.append("g").attr("class", "y-axis");

  const data = [];
  function updateChart(message) {
    const value = parseFloat(message.toString());
    data.push(value);
    if (data.length > 10) {
      data.shift();
    }

    xScale.domain(data.map((_, i) => i));
    yScale.domain([d3.min(data) > 0 ? 0 : d3.min(data), d3.max(data)]);

    xAxisGroup.transition().call(d3.axisBottom(xScale));
    yAxisGroup.transition().call(d3.axisLeft(yScale));

    const bars = svgCanvas.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .merge(bars)
      .transition()
      .duration(500)
      .attr("x", (_, i) => xScale(i))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => innerHeight - yScale(d))
      .attr("fill", barColor);
  }

  return {svgCanvas, updateChart}
}
