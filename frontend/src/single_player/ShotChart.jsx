import * as d3 from "d3";
import { useMemo } from "react";
import "./SinglePlayerView.css";

function ShotChart({ shotChartData, height, width }) {
  const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };
  const boundsWidth = height - MARGIN.right - MARGIN.left;
  const boundsHeight = width - MARGIN.top - MARGIN.bottom;

  const rows = useMemo(
    () => [...new Set(shotChartData.map((dataPoint) => dataPoint.top))],
    [shotChartData]
  );
  const columns = useMemo(
    () => [...new Set(shotChartData.map((dataPoint) => dataPoint.left))],
    [shotChartData]
  );

  const xScale = d3.scaleBand().range([0, 600]).domain(columns).padding(0.01);

  const yScale = d3.scaleBand().range([500, 0]).domain(rows).padding(0.01);

  const [min, max] = d3.extent(
    shotChartData.map((dataPoint) => dataPoint.value)
  );

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([min, max]);

  const chartRegions = shotChartData.map((region, i) => {
    const color = colorScale(region.value).substring(1);
    const colorHex = parseInt(color, 16);
    const whiteHex = 0xffffff;
    return (
      <rect
        key={i}
        r={4}
        x={xScale(region.left)}
        y={yScale(region.top)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={colorHex / whiteHex}
        fill={colorScale(region.value)}
        rx={5}
        stroke={"white"}
      />
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
        <g className="heatRegions">{chartRegions}</g>
      </svg>
    </div>
  );
}

export default ShotChart;
