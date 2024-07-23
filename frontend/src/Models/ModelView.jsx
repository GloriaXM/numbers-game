import "./ModelView.css";
import { useState, useEffect, useMemo } from "react";
import SortBar from "../table_components/SortBar";
import { LineChart } from "@mui/x-charts/LineChart";
import { regressionLog } from "d3-regression";

function ModelView({ careerData }) {
  const seasonsXAxis = useMemo(() => {
    let seasons = careerData.map((season) => {
      return season.season;
    });
    seasons = seasons.reverse();
    seasons.push(seasons[seasons.length - 1] + 1);
    return seasons;
  }, [careerData]);
  const [regressionPoints, setRegressionPoints] = useState([]);
  const valueFormatter = (value) => `${value}`;

  const [values, setValues] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuIsOpen = menuOpen == null ? false : true;

  const STAT_OPTIONS = Object.freeze({
    AST: "Assists (AST)",
    BLK: "Blocks (BLK)",
    DRB: "Defensive Rebounds (DRB)",
    PF: "Personal Fouls (PF)",
    PTS: "Points (PTS)",
    STL: "Steals (STL)",
    TOV: "Turnovers (TOV)",
    TRB: "Total Rebounds",
    effect_fg_percent: "Effective FG Percent",
    field_attempts: "Field attempts",
    field_goals: "Field Goals (FG)",
    field_percent: "Field Percent",
    ft: "Free Throws",
    ft_percent: "Free Throw Percent",
    fta: "Free Throw Attempts (FTA)",
    games: "Games Played",
    games_started: "Games Started",
    minutes_played: "Minutes",
    three_attempts: "Three attempts",
    three_fg: "Three Makes",
    three_percent: "Three Percent",
    two_attempts: "Two attempts",
    two_fg: "Two Makes",
    two_percent: "Two Percent",
  });
  const [displayedStat, setDisplayedStat] = useState("PTS");

  function calcRegressionPoints(yValues) {
    const data = seasonsXAxis.map((season, index) => {
      return { season: season, value: yValues[index] };
    });

    const regressionGenerator = regressionLog()
      .x((data) => data.season)
      .y((data) => data.value)
      .domain([1e-6, seasonsXAxis[seasonsXAxis.length - 1] + 1])(data);

    const regressionDiscretized = seasonsXAxis.map((season) => {
      return regressionGenerator.a * Math.log(season) + regressionGenerator.b;
    });

    setRegressionPoints(regressionDiscretized);
  }

  useEffect(() => {
    const newValues = [];
    for (var i = careerData.length - 1; i >= 0; i--) {
      newValues.push(careerData[i][displayedStat]);
    }
    setValues(newValues);
    calcRegressionPoints(newValues);
  }, [careerData, displayedStat]);

  return (
    <div className="modelView">
      <SortBar
        isOpen={menuIsOpen}
        option={displayedStat}
        setOption={setDisplayedStat}
        anchorEl={menuOpen}
        setAnchorEl={setMenuOpen}
        options={STAT_OPTIONS}
      />
      <LineChart
        className="statsChart"
        xAxis={[
          {
            data: seasonsXAxis,
            tickMinStep: 1,
            valueFormatter: (year) => `${year}`,
          },
        ]}
        yAxis={[{ min: 0 }]}
        series={[
          {
            data: regressionPoints,
            color: "#dcdcdc",
            label: "Expected",
            valueFormatter: (value) => `${value.toFixed(0)}`,
          },
          {
            data: values,
            valueFormatter,
            label: "Actual",
          },
        ]}
        valueFormatter
        width={700}
        height={500}
      />
    </div>
  );
}

export default ModelView;
