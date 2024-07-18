import PlayerCard from "../my_team/PlayerCard";
import { UserContext } from "../UserContext.js";
import { useContext } from "react";

function ScoutOpponent({
  setDisplay,
  setTeamPlayers,
  teamPlayers,
  recommendations,
}) {
  const userContext = useContext(UserContext);
  function closeScout() {
    setDisplay(false);
  }

  return (
    <div>
      <h1> Scout opponent</h1>
      <button onClick={closeScout}> X </button>
      {teamPlayers.map((player) => {
        return (
          <PlayerCard
            key={"opponent " + player.id}
            player={player}
            setTeamPlayers={setTeamPlayers}
            teamPlayers={teamPlayers}
            userId={userContext.user.id}
            teamType="opponents"
          />
        );
      })}
      <div className="keyPoints">
        <h3> Recommendations:</h3>
        {recommendations.keyPoints.map((point) => {
          return <p>{point}</p>;
        })}
      </div>
      <div className="areasOfImprovement">
        <h3> Areas Of Improvement:</h3>
        {recommendations.areasOfImprovement.map((point) => {
          return <p>{point}</p>;
        })}
      </div>
    </div>
  );
}

export default ScoutOpponent;
