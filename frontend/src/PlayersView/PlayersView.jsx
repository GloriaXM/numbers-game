import StatsTable from "./StatsTable";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";

function PlayersView() {
  const [playersList, setPlayersList] = useState([]);
  const [playersDisplayed, setPlayersDisplayed] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function loadPlayers(page) {
    const response = await fetch(`http://localhost:5000/players`);
    const players = await response.json();
    console.log(players);
    setPlayersList(players);
  }

  useEffect(() => {
    loadPlayers(page);
    //TODO: add dependency on sort type
  }, []);

  useEffect(() => {
    const start = page * rowsPerPage + 1;
    const end = start + rowsPerPage;
    setPlayersDisplayed(playersList.slice(start, end));
  }, [page, rowsPerPage]);

  return (
    <div className="playersView">
      <Header />
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
