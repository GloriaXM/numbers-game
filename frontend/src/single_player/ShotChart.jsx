import * as d3 from "d3";
import { useRef, useMemo } from "react";
import "./ShotChart.css";

function ShotChart({ shotChartData, height, width }) {
  const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };
  const boundsWidth = 1000 - MARGIN.right - MARGIN.left;
  const boundsHeight = 800 - MARGIN.top - MARGIN.bottom;

  const rows = useMemo(
    () => [...new Set(shotChartData.map((dataPoint) => dataPoint.top))],
    [shotChartData]
  );
  const columns = useMemo(
    () => [...new Set(shotChartData.map((dataPoint) => dataPoint.left))],
    [shotChartData]
  );

  const xScale = d3
    .scaleBand()
    .range([0, boundsWidth])
    .domain(columns)
    .padding(0.01);

  const yScale = d3
    .scaleBand()
    .range([boundsHeight, 0])
    .domain(rows)
    .padding(0.01);

  const [min, max] = d3.extent(
    shotChartData.map((dataPoint) => dataPoint.value)
  );

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([min, max]);

  const chartRegions = shotChartData.map((region, i) => {
    return (
      <rect
        key={i}
        r={4}
        x={xScale(region.left)}
        y={yScale(region.top)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={colorScale(region.value)}
        rx={5}
        stroke={"white"}
      />
    );
  });

  const xLabels = columns.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  const yLabels = rows.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <div className="shotChart img-overlay-wrap">
      <img
        className="courtOverlay"
        src="https://cdn.ssref.net/req/1/images/bbr/nbahalfcourt.png"
        alt="court image overlay"
      />
      <svg className="heatMap" width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {chartRegions}
          {xLabels}
          {yLabels}
        </g>
      </svg>
    </div>
  );
}

export default ShotChart;
