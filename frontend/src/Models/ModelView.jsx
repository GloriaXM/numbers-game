import "./ModelView.css";
import LinePlot from "./LinePlot";

function ModelView({ careerData }) {
  return (
    <div className="modelView">
      <LinePlot data={[1, 1, 3, 8, 2]} />
      <div className="viewOptions">
        <button> Stat1</button>
        <button> Stat2</button>
        <button> Stat3</button>
      </div>
    </div>
  );
}

export default ModelView;
