import "./ModelView.css";
import LinePlot from "./LinePlot";
import { useState, useEffect } from "react";

function ModelView({ careerData }) {
  const [values, setValues] = useState([]);
  let newValues = [];

  useEffect(() => {
    for (var i = careerData.length - 1; i >= 0; i--) {
      newValues.push(careerData[i].PTS);
    }
    setValues(newValues);
  }, [careerData]);

  return (
    <div className="modelView">
      <LinePlot data={values} />
      <div className="viewOptions">
        <button> Stat1</button>
        <button> Stat2</button>
        <button> Stat3</button>
      </div>
    </div>
  );
}

export default ModelView;
