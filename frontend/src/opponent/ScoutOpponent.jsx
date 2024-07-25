import PlayerCard from "../my_team/PlayerCard";
import BarGraph from "../models/BarGraph.jsx";
import { UserContext } from "../UserContext.js";
import { useContext, useMemo, useState, useEffect } from "react";
import "./ScoutOpponent.css";
import RecommendationFeedback from "./RecommendationFeedback.jsx";
import SortBar from "../table_components/SortBar.jsx";
import { Typography } from "@mui/material";

function ScoutOpponent({
  setDisplay,
  myTeamPlayers,
  setOpponentPlayers,
  opponentPlayers,
  recommendations,
  refetchPlayers,
  refetchMyTeam,
  myTeamStyle,
  setMyTeamStyle,
}) {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const userContext = useContext(UserContext);

  //TODO: use useMemo in MyTeamView
  const comparedScores = useMemo(() => {
    const myTeamScores = calcTeamScores(myTeamPlayers);
    const opponentScores = calcTeamScores(opponentPlayers);
    let data = [];

    Object.keys(myTeamScores).forEach(function (score) {
      data.push({
        style: score,
        myTeamScore: myTeamScores[score],
        opponentScore: opponentScores[score],
      });
    });

    normalizeComparedScores(data);

    return data;
  }, [myTeamPlayers, opponentPlayers]);

  const STYLES = Object.freeze({
    outsideOffenseScore: "Outside Offense",
    insideOffenseScore: "Inside Offense",
    offenseDisciplineScore: "Offensive Discipline",
    defenseDisciplineScore: "Defensive Discipline",
    consistencyScore: "Consistency",
    reboundingScore: "Rebounding",
  });

  const [stylesAnchorEl, setStylesAnchorEl] = useState(null);
  const stylesMenuIsOpen = stylesAnchorEl == null ? false : true;

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

  function normalizeComparedScores(data) {
    data.forEach((score) => {
      const normalizingFactor = (score.myTeamScore + score.opponentScore) / 100;
      score.myTeamScore /= normalizingFactor;
      score.opponentScore /= normalizingFactor;
    });
  }

  useEffect(() => {
    refetchMyTeam();
  }, [myTeamStyle]);

  return (
    <div className="scoutOpponent">
      <button className="closeScout" onClick={closeScout}>
        Close Scouting View
      </button>
      <Typography> Recommended Roster: </Typography>
      <SortBar
        isOpen={stylesMenuIsOpen}
        option={myTeamStyle}
        setOption={setMyTeamStyle}
        anchorEl={stylesAnchorEl}
        setAnchorEl={setStylesAnchorEl}
        options={STYLES}
      />
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
              refetchPlayers={refetchPlayers}
            />
          );
        })}
      </div>
      <BarGraph comparedScores={comparedScores} />
      <div className="recommendations">
        <div className="keyPoints">
          <h3> Recommendations:</h3>
          <RecommendationFeedback recommendations={recommendations.keyPoints} />
        </div>
        <div className="areasOfImprovement">
          <h3> Areas Of Improvement:</h3>
          <RecommendationFeedback
            recommendations={recommendations.areasOfImprovement}
          />
        </div>
      </div>
    </div>
  );
}

export default ScoutOpponent;
