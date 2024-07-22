import { BarChart } from "@mui/x-charts/BarChart";

function BarGraph() {
  const performanceScores = [
    { style: "Outside Offense", score: 32 },
    { style: "Inside Offense", score: 32 },
    { style: "Offense Discipline", score: 32 },
    { style: "Defense Discipline", score: 32 },
    { style: "Consistency", score: 32 },
    { style: "Rebounding", score: 32 },
  ];
  return (
    <div>
      <h1> Bar Graph</h1>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        dataset={performanceScores}
        width={600}
        height={400}
      />
    </div>
  );
}

export default BarGraph;
