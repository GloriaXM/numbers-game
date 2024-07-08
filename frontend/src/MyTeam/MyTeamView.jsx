import Header from "../Header/Header.jsx";
import StatsTable from "../TableComponents/StatsTable";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";

function MyTeamView() {
  const [myTeamPlayers, setMyTeamPlayers] = useState([]);
  const [playersStats, setPlayersStats] = useState([]);
  const userContext = useContext(UserContext);

  async function fetchMyTeam() {
    const queryUrl = new URL(`http://localhost:5000/myTeamPlayers`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    const response = await fetch(queryUrl);
    const data = await response.json();
    setMyTeamPlayers(data);
  }

  async function fetchSinglePlayer(playerId, performanceScore, myTeamId) {
    const queryUrl = new URL(`http://localhost:5000/singlePlayerStats`);
    queryUrl.searchParams.append("playerId", playerId);
    const response = await fetch(queryUrl);
    let player = await response.json();
    player.performanceScore = performanceScore;
    player.myTeamId = myTeamId;
    setPlayersStats((playersStats) => [...playersStats, player]);
  }

  useEffect(() => {
    fetchMyTeam();
  }, []);

  useEffect(() => {
    myTeamPlayers.map((player) => {
      fetchSinglePlayer(player.playerId, player.performanceScore, player.id);
    });
  }, [myTeamPlayers]);

  return (
    <div className="view myTeamView">
      <Header />
      <div className="playerCardList">
        {playersStats.map((player) => {
          return (
            <PlayerCard
              key={player.id}
              player={player}
              setMyTeamPlayers={setMyTeamPlayers}
              myTeamPlayers={myTeamPlayers}
            />
          );
        })}
      </div>
      <StatsTable playersList={playersStats} />
    </div>
  );
}

export default MyTeamView;
