import StatsTable from "../table_components/StatsTable";
import SortMenu from "../table_components/SortMenu";
import Header from "../header/Header";
import SearchBar from "../table_components/SearchBar";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import "./PlayersView.css";

function PlayersView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [playersList, setPlayersList] = useState([]);
  const [playersDisplayed, setPlayersDisplayed] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortType, setSortType] = useState("no_sort");
  const [sortDirection, setSortDirection] = useState("no_direction");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function loadPlayers() {
    let queryUrl = new URL(`${PORT}/players`);
    queryUrl.searchParams.append("sortType", sortType);
    queryUrl.searchParams.append("sortDirection", sortDirection);
    queryUrl.searchParams.append("playerName", searchQuery);
    const response = await fetch(queryUrl);
    const players = await response.json();
    setPlayersList(players);
  }

  async function searchPlayer(playerName) {
    if (playerName === "") {
      return;
    }

    let queryUrl = new URL(`${PORT}/searchPlayers`);
    queryUrl.searchParams.append("playerName", playerName);
    const response = await fetch(queryUrl);
    const players = await response.json();
    setPlayersList(players);
  }

  useEffect(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPlayersDisplayed(playersList.slice(start, end));
  }, [page, rowsPerPage]);

  useEffect(() => {
    loadPlayers();
  }, [sortType, sortDirection, searchQuery]);

  useEffect(() => {
    setPlayersDisplayed(playersList.slice(0, rowsPerPage));
    setPage(0);
  }, [playersList]);

  return (
    <div className="view playersView">
      <Header />
      <SearchBar setSearchQuery={setSearchQuery} />
      <SortMenu setSortType={setSortType} setSortDirection={setSortDirection} />
      <StatsTable playersList={playersDisplayed} />
      <TablePagination
        component="div"
        count={playersList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default PlayersView;
