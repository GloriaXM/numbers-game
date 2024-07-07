import "./MyTeamView.css";
import Header from "../Header/Header.jsx";
import PlayerCardList from "./PlayerCardList.jsx";
import StatsTable from "../TableComponents/StatsTable";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext.js";

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

  async function fetchSinglePlayer(playerId, performanceScore) {
    const queryUrl = new URL(`http://localhost:5000/singlePlayerStats`);
    queryUrl.searchParams.append("playerId", playerId);
    const response = await fetch(queryUrl);
    let player = await response.json();
    player.performanceScore = performanceScore;
    setPlayersStats((playersStats) => [...playersStats, player]);
  }

  useEffect(() => {
    fetchMyTeam();
  }, []);

  useEffect(() => {
    myTeamPlayers.map((player) => {
      fetchSinglePlayer(player.playerId, player.performanceScore);
    });
  }, [myTeamPlayers]);

  return (
    <div className="myTeamView">
      <Header />
      <PlayerCardList playersStats={playersStats} />
      <StatsTable playersList={playersStats} />
    </div>
  );
}

export default MyTeamView;
