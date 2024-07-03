import StatsTable from "../TableComponents/StatsTable";
import SortMenu from "../TableComponents/SortMenu";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";

function PlayersView() {
  const [playersList, setPlayersList] = useState([]);
  const [playersDisplayed, setPlayersDisplayed] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortType, setSortType] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function loadPlayers(sortType) {
    const response = await fetch(`http://localhost:5000/players`);
    const players = await response.json();
    setPlayersList(players);
    setPage(0);
  }

  useEffect(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPlayersDisplayed(playersList.slice(start, end));
  }, [page, rowsPerPage]);

  useEffect(() => {
    loadPlayers(sortType);
  }, [sortType]);

  return (
    <div className="playersView">
      <Header />
      <SortMenu setSortType={setSortType} />
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
