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
    player.performanceScore = await checkPerformanceScore(
      playerId,
      player,
      performanceScore
    );
    player.myTeamId = myTeamId;
    setPlayersStats((playersStats) => [...playersStats, player]);
  }

  async function checkPerformanceScore(playerId, player, performanceScore) {
    //TODO: Make formula more significant
    let expectedScore = (
      ((player.PTS + 3 * player.TRB + 5 * player.STL + 4 * player.BLK) /
        player.games -
        (6 * player.TOV + player.PF) / player.minutes_played) *
      1.4
    ).toFixed(0);

    if (!expectedScore) {
      expectedScore = 30;
    }

    if (performanceScore != expectedScore) {
      updatePerformance(playerId, expectedScore);
      return expectedScore;
    } else {
      return performanceScore;
    }
  }

  async function updatePerformance() {
    //TODO: implement database post
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
