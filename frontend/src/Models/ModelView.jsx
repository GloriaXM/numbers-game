import "./ModelView.css";
import { useState, useEffect, useMemo } from "react";
import SortBar from "../table_components/SortBar";
import { LineChart } from "@mui/x-charts/LineChart";

function ModelView({ careerData }) {
  const seasonsXAxis = useMemo(() => {
    let seasons = careerData.map((season) => {
      return season.season;
    });
    seasons = seasons.reverse();
    return seasons;
  }, [careerData]);
  const valueFormatter = (value) => `${value}`;

  const [values, setValues] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuIsOpen = menuOpen == null ? false : true;

  const STAT_OPTIONS = Object.freeze({
    PTS: "PTS",
    three_fg: "three_fg",
    three_percent: "three_percent",
    TRB: "TRB",
    effect_fg_percent: "effect_fg_percent",
  });
  const [displayedStat, setDisplayedStat] = useState(STAT_OPTIONS.PTS);

  let newValues = [];

  useEffect(() => {
    for (var i = careerData.length - 1; i >= 0; i--) {
      newValues.push(careerData[i][displayedStat]);
    }
    setValues(newValues);
  }, [careerData, displayedStat]);

  return (
    <div className="modelView">
      <LineChart
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
            data: values,
            valueFormatter,
          },
        ]}
        valueFormatter
        width={700}
        height={500}
      />
      <SortBar
        isOpen={menuIsOpen}
        option={displayedStat}
        setOption={setDisplayedStat}
        anchorEl={menuOpen}
        setAnchorEl={setMenuOpen}
        optionsList={Object.values(STAT_OPTIONS)}
      />
      <div className="viewOptions">
        <button> Stat1</button>
        <button> Stat2</button>
        <button> Stat3</button>
      </div>
    </div>
  );
}

export default ModelView;
