import StatsTable from "./StatsTable";
import Header from "../Header/Header";
import { useState, useEffect } from "react";

function PlayersView() {
  const [playersList, setPlayersList] = useState([]);
  const [page, setPage] = useState(1);

  async function loadPlayers(page) {
    const response = await fetch(
      `https://nba-stats-db.herokuapp.com/api/playerdata/?page=${page}`
    );
    const data = await response.json();
    const players = data.results;
    setPlayersList(players);
  }

  useEffect(() => {
    loadPlayers(page);
  }, [page]);

  return (
    <div className="playersView">
      <Header />
      <StatsTable playersList={playersList} />
    </div>
  );
}

export default PlayersView;
