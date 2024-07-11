import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import OpponentCard from "./OpponentCard";

function ScoutOpponent({ display, setDisplay, opponents }) {
  function closeScout() {
    setDisplay(false);
  }

  return (
    <div style={{ display: display ? "block" : "none" }}>
      <button onClick={closeScout}> X</button>
      <h1> Scout opponent</h1>
      {opponents.map((player) => {
        return <OpponentCard />;
      })}
    </div>
  );
}

export default ScoutOpponent;
