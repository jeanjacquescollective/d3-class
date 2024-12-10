import barChart from "./barChart.mjs";
import circleChart from "./circleChart.mjs";

circleChart("#circleChart", [
  { r: Math.random() * 50, color: "pink" },
  { r: Math.random() * 50, color: "brown" },
  { r: Math.random() * 50, color: "cyan" },
  { r: Math.random() * 50, color: "magenta" },
  { r: Math.random() * 50, color: "lime" },
]);

barChart("#barChart", [10,20,30,40,50])
