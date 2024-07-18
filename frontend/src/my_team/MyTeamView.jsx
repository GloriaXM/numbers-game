import Header from "../header/Header.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";
import ScoutOpponent from "../opponent/ScoutOpponent.jsx";

function MyTeamView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [myTeamPlayers, setMyTeamPlayers] = useState([]);
  const [displayScout, setDisplayScout] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [recommendations, setRecommendations] = useState({
    bestPlayers: [],
    response: { keyPoints: [], areasOfImprovement: [] },
  });
  const userContext = useContext(UserContext);

  async function fetchTeamPlayers(teamType) {
    const queryUrl = new URL(`${PORT}/teamPlayers`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    queryUrl.searchParams.append("teamType", teamType);
    const response = await fetch(queryUrl);

    const data = await response.json();
    if (teamType === "myTeamPlayers") {
      setMyTeamPlayers(data[teamType]);
    } else {
      setOpponents(data[teamType]);
    }
  }

  async function handleScoutClick() {
    setDisplayScout(true);
    const queryUrl = new URL(`${PORT}/scoutOpponent`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    const response = await fetch(queryUrl);
    const results = await response.json();
    setRecommendations(results);
  }

  useEffect(() => {
    fetchTeamPlayers("myTeamPlayers");
    fetchTeamPlayers("opponents");
  }, []);

  useEffect(() => {
    setMyTeamPlayers(recommendations.bestPlayers);
  }, [recommendations]);

  return (
    <div className="view myTeamView">
      <Header />
      <div className="playerCardList">
        {/* TODO: Add scrolling styling or move to separate div if more team stats added */}

        {myTeamPlayers.map((player) => {
          return (
            <PlayerCard
              key={player.id}
              player={player}
              setTeamPlayers={setMyTeamPlayers}
              teamPlayers={myTeamPlayers}
              userId={userContext.user.id}
              teamType="myTeamPlayers"
            />
          );
        })}
      </div>
      <button onClick={handleScoutClick}> Scout Opponent</button>
      <div className="playerCardList">
        {displayScout && (
          <ScoutOpponent
            setDisplay={setDisplayScout}
            teamPlayers={opponents}
            setTeamPlayers={setOpponents}
            recommendations={recommendations.response}
          />
        )}
      </div>
      <StatsTable playersList={myTeamPlayers} />
    </div>
  );
}

export default MyTeamView;
