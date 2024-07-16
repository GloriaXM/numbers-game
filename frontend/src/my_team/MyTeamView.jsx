import Header from "../header/Header.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";
import ScoutOpponent from "../opponent/ScoutOpponent.jsx";

function MyTeamView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [myTeamPlayers, setMyTeamPlayers] = useState([]);
  const [myTeamStats, setMyTeamStats] = useState([]);
  const [displayScout, setDisplayScout] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const userContext = useContext(UserContext);

  async function fetchTeamPlayers(teamType) {
    const queryUrl = new URL(`${PORT}/${teamType}`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    const response = await fetch(queryUrl);

    const data = await response.json();
    if (teamType === "myTeamPlayers") {
      setMyTeamPlayers(data);
    } else {
      setOpponents(data);
    }
  }

  async function fetchSinglePlayer(playerId) {
    const queryUrl = new URL(`${PORT}/singlePlayerStats`);
    queryUrl.searchParams.append("playerId", playerId);
    const response = await fetch(queryUrl);
    let player = await response.json();

    return player;
  }

  async function fetchPlayersStats() {
    let newPlayersStats = await Promise.all(
      myTeamPlayers.map(async (player) => {
        try {
          let result = await fetchSinglePlayer(player.playerId);
          result.myTeamId = player.id;
          return result;
        } catch (error) {
          //handle errors
        }
      })
    );
    setMyTeamStats(newPlayersStats);
  }

  useEffect(() => {
    fetchTeamPlayers("myTeamPlayers");
    fetchTeamPlayers("opponents");
  }, []);

  useEffect(() => {
    fetchPlayersStats();
  }, [myTeamPlayers]);

  return (
    <div className="view myTeamView">
      <Header />
      <div className="playerCardList">
        {/* TODO: Add scrolling styling or move to separate div if more team stats added */}

        {myTeamStats.map((player) => {
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
      <div>
        <button onClick={setDisplayScout}> Scout Opponent</button>
        {displayScout && (
          <ScoutOpponent
            display={displayScout}
            setDisplay={setDisplayScout}
            opponents={opponents}
          />
        )}
      </div>
      <StatsTable playersList={myTeamStats} />
    </div>
  );
}

export default MyTeamView;
