import createBarChart from "./barChart.mjs";

const TOPICS = ["channel/temperature"];

function connectToBroker(url, topics) {
  const client = mqtt.connect(url);

  client.on("connect", () => {
    console.log("Verbonden met MQTT broker");
    topics.forEach((topic) => {
      client.subscribe(topic, (error) => {
        if (!error) {
          console.log(`Subscribed to ${topic}`);
        } else {
          console.log(`An error: ${error}`);
        }
      });
    });
  });

  client.on("message", (topic, message) => {
    if (topic === "channel/temperature") {
      // update the chart
      temperatureChart.updateChart(message)
    }
    console.log(`Ontvangen van ${topic}: ${message}`);
  });
}
console.log('test')
connectToBroker("wss://broker.hivemq.com:8884/mqtt", TOPICS);
const temperatureChart = createBarChart("#temperatureChart", 600, 300, "steelblue")
