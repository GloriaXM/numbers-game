import StatsTable from "../table_components/StatsTable";
import Header from "../header/Header";
import SearchBar from "../table_components/SearchBar";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import "./PlayersView.css";
import { useQuery } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader";
import ErrorAlert from "../suspense/ErrorAlert";

function PlayersView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [displayServerError, setDisplayServerError] = useState(false);

  const [playersDisplayed, setPlayersDisplayed] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const playersList = useQuery({
    queryKey: ["playersList"],
    queryFn: async () => {
      return await loadPlayers();
    },
  });

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
    try {
      let queryUrl = new URL(`${PORT}/players`);
      queryUrl.searchParams.append("sortType", sortType);
      queryUrl.searchParams.append("sortDirection", sortDirection);
      queryUrl.searchParams.append("playerName", searchQuery);
      const response = await fetch(queryUrl);
      const players = await response.json();
      return players;
    } catch (error) {
      setDisplayServerError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPlayersDisplayed(
      playersList.data ? playersList.data.slice(start, end) : []
    );
  }, [page, rowsPerPage, playersList.data]);

  useEffect(() => {
    playersList.refetch();
  }, [sortType, sortDirection, searchQuery]);

  return (
    <div className="view playersView">
      <Header />
      <ErrorAlert
        displayError={displayServerError}
        setDisplayError={setDisplayServerError}
      />

      {playersList.isPending && <AppLoader />}
      {playersList.data && (
        <div>
          <div className="searchPlayers">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <StatsTable
            playersList={playersDisplayed}
            setSortType={setSortType}
            setSortDirection={setSortDirection}
            sortType={sortType}
          />
          <TablePagination
            component="div"
            count={playersList.data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
}

export default PlayersView;
