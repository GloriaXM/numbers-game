import { BarChart } from "@mui/x-charts/BarChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

function BarGraph({ comparedScores }) {
  return (
    <div className="barGraph">
      <h2> Compare Playing Styles</h2>
      <BarChart
        dataset={comparedScores}
        xAxis={[{ scaleType: "band", dataKey: "style" }]}
        yAxis={[{ scaleType: "linear", min: 0, max: 100 }]}
        series={[
          { dataKey: "myTeamScore", label: "My Team", stack: "A" },
          { dataKey: "opponentScore", label: "Opponent", stack: "A" },
        ]}
        width={900}
        height={400}
      >
        <ChartsReferenceLine y={50} labelAlign="end" />
      </BarChart>
    </div>
  );
}

export default BarGraph;
