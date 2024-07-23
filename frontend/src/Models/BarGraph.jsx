import { BarChart } from "@mui/x-charts/BarChart";

function BarGraph({ compareScores }) {
  return (
    <div className="barGraph">
      <h2> Compare Playing Styles</h2>
      <BarChart
        dataset={compareScores}
        xAxis={[{ scaleType: "band", dataKey: "style" }]}
        yAxis={[{ scaleType: "linear", min: 0, max: 100 }]}
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
