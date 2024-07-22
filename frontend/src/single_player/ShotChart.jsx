import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

function ShotChart({ shotChartData }) {
  const shotChartRef = useRef();
  const shotChartHeat = useQuery({
    queryKey: ["shotChartHeat"],
    queryFn: async () => {
      return await convertCoordinatesToHeat();
    },
  });
  const SHOT_CHART_ROWS = 8;
  const SHOT_CHART_COLS = 10;

  async function convertCoordinatesToHeat() {
    let shotMatrix = Array(SHOT_CHART_ROWS)
      .fill()
      .map(() => Array(SHOT_CHART_COLS).fill(0));

    shotChartData.forEach((coord) => {
      const row = Math.floor(coord.top / 50);
      const col = Math.floor(coord.left / 50);
      shotMatrix[row][col] += 1;
    });

    const resultHeatMap = [];
    shotMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        resultHeatMap.push({ top: rowIndex, left: colIndex, value: cell });
      });
    });
    return { shotMatrix };
  }

  useEffect(() => {
    const shotChart = d3.select(shotChartRef.current);
    shotChart.append("circle").attr("cx", 150).attr("cy", 70).attr("r", 50);
  }, []);

  return (
    <div className="shotChart">
      <h1> Shot Chart</h1>
      <svg
        ref={shotChartRef}
        style={{
          border: "2px solid gold",
        }}
        width={700}
        height={700}
      ></svg>
    </div>
  );
}

export default ShotChart;
