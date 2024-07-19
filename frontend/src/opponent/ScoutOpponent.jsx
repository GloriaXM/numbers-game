import PlayerCard from "../my_team/PlayerCard";
import BarGraph from "../models/BarGraph.jsx";
import { UserContext } from "../UserContext.js";
import { useContext, useMemo } from "react";
import "./ScoutOpponent.css";

function ScoutOpponent({
  setDisplay,
  myTeamPlayers,
  setOpponentPlayers,
  opponentPlayers,
  recommendations,
}) {
  const userContext = useContext(UserContext);

  //TODO: use useMemo in MyTeamView
  const compareScores = useMemo(() => {
    const myTeamScores = calcTeamScores(myTeamPlayers);
    const opponentScores = calcTeamScores(opponentPlayers);
    const data = [];

    Object.keys(myTeamScores).forEach(function (score) {
      data.push({
        style: score,
        myTeamScore: myTeamScores[score],
        opponentScore: opponentScores[score],
      });
    });

    return data;
  }, [myTeamPlayers, opponentPlayers]);

  function closeScout() {
    setDisplay(false);
  }

  function calcTeamScores(team) {
    const teamScores = {
      outsideOffense: 0,
      insideOffense: 0,
      offenseDiscipline: 0,
      defenseDiscipline: 0,
      consistency: 0,
      rebounding: 0,
    };

    team.forEach((player) => {
      teamScores.outsideOffense += player.outsideOffenseScore;
      teamScores.insideOffense += player.insideOffenseScore;
      teamScores.offenseDiscipline += player.offenseDisciplineScore;
      teamScores.defenseDiscipline += player.defenseDisciplineScore;
      teamScores.consistency += player.consistencyScore;
      teamScores.rebounding += player.reboundingScore;
    });

    Object.keys(teamScores).forEach(function (score) {
      teamScores[score] /= team.length;
    });

    return teamScores;
  }

  return (
    <div className="scoutOpponent">
      <button className="closeScout" onClick={closeScout}>
        Close Scouting View
      </button>
      <div className="playerCardList">
        {opponentPlayers.map((player) => {
          return (
            <PlayerCard
              key={"opponent " + player.id}
              player={player}
              setTeamPlayers={setOpponentPlayers}
              teamPlayers={opponentPlayers}
              userId={userContext.user.id}
              teamType="opponents"
            />
          );
        })}
      </div>
      <div className="recommendations">
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
        <BarGraph compareScores={compareScores} />
      </div>
    </div>
  );
}

export default ScoutOpponent;
