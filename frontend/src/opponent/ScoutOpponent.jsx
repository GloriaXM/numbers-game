import PlayerCard from "../my_team/PlayerCard";
import { UserContext } from "../UserContext.js";
import { useEffect, useState, useContext } from "react";

function ScoutOpponent({ setDisplay, setTeamPlayers, teamPlayers }) {
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
    </div>
  );
}

export default ScoutOpponent;
