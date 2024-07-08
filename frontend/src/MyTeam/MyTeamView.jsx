import Header from "../Header/Header.jsx";
import StatsTable from "../TableComponents/StatsTable";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";

function MyTeamView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [myTeamPlayers, setMyTeamPlayers] = useState([]);
  const [playersStats, setPlayersStats] = useState([]);
  const userContext = useContext(UserContext);

  async function fetchMyTeam() {
    const queryUrl = new URL(`${PORT}/myTeamPlayers`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    const response = await fetch(queryUrl);
    const data = await response.json();
    setMyTeamPlayers(data);
  }

  async function fetchSinglePlayer(playerId, performanceScore, myTeamId) {
    const queryUrl = new URL(`${PORT}/singlePlayerStats`);
    queryUrl.searchParams.append("playerId", playerId);
    const response = await fetch(queryUrl);
    let player = await response.json();
    player.myTeamId = myTeamId;
    player.performanceScore = await checkPerformanceScore(
      player,
      performanceScore
    );
    setPlayersStats((playersStats) => [...playersStats, player]);
  }

  async function checkPerformanceScore(player, performanceScore) {
    let expectedScore = (
      70 +
      (1.5 + player.ft_percent) *
        ((8 * player.PTS +
          12 * player.ORB +
          11 * player.DRB +
          15 * player.STL +
          10 * player.AST +
          13 * player.BLK -
          10 * (player.PF / player.games - 3)) /
          player.minutes_played) -
      (15 * player.TOV + 10 * (1 - player.field_percent)) /
        player.minutes_played
    ).toFixed(0);

    if (!expectedScore) {
      expectedScore = 30;
    }

    if (performanceScore != expectedScore) {
      updatePerformance(player.myTeamId, expectedScore);
      return expectedScore;
    } else {
      return performanceScore;
    }
  }

  async function updatePerformance(playerId, newScore) {
    const queryUrl = new URL(`${PORT}/myTeamPlayer/performance`);

    const response = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId: playerId, performance: newScore }),
      credentials: "include",
    });

    await response.json();
  }

  useEffect(() => {
    fetchMyTeam();
  }, []);

  useEffect(() => {
    setPlayersStats([]);
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
