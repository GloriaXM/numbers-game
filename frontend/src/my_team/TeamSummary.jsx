import { useState, useEffect } from "react";

function TeamSummary({ playersStats }) {
  const [teamAverage, setTeamAverage] = useState(0);

  useEffect(() => {
    let currAverage = 0;

    playersStats.map((player) => {
      currAverage += player.performanceScore / playersStats.length;
    });

    setTeamAverage(currAverage);
  }, [playersStats]);

  return (
    <div className="teamSummary">
      <h2> Team Performance:</h2>
      <h1> {teamAverage.toFixed(0)}</h1>
    </div>
  );
}

export default TeamSummary;
