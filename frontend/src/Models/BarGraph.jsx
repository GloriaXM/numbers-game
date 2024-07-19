import { BarChart } from "@mui/x-charts/BarChart";

function BarGraph({ compareScores }) {
  return (
    <div>
      <h1> Bar Graph</h1>
      <BarChart
        dataset={compareScores}
        xAxis={[{ scaleType: "band", dataKey: "style" }]}
        series={[
          { dataKey: "myTeamScore", label: "My Team", stack: "A" },
          { dataKey: "opponentScore", label: "Opponent", stack: "A" },
        ]}
        width={900}
        height={400}
      />
    </div>
  );
}

export default BarGraph;
