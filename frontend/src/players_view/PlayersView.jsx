import StatsTable from "../table_components/StatsTable";
import Header from "../header/Header";
import SearchBar from "../table_components/SearchBar";
import SortBar from "../table_components/SortBar";
import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import "./PlayersView.css";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

function PlayersView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [playersDisplayed, setPlayersDisplayed] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const playersList = useQuery({
    queryKey: ["playersList"],
    queryFn: async () => {
      return await loadPlayers();
    },
  });

  const SORT_OPTIONS = Object.freeze({
    no_sort: "Sort Players",
    id: "ID",
    player_name: "Player Name",
    PTS: "Points",
    field_percent: "Field Percent",
    three_percent: "Three Percent",
    two_percent: "Two Percent",
    effect_fg_percent: "Effective FG Percent",
    ft_percent: "Free Throw Percent",
    ORB: "Offensive Rebounds",
    DRB: "Defensive Rebounds",
    TRB: "Total Rebounds",
    AST: "Assists",
    STL: "Steals",
    BLK: "Blocks",
    TOV: "Turnovers",
    PF: "Personal Fouls",
  });
  const [sortType, setSortType] = useState("no_sort");

  const SORT_DIRECTIONS = Object.freeze({
    no_direction: "No Direction",
    asc: "Ascending",
    desc: "Descending",
  });

  const [sortDirection, setSortDirection] = useState("no_direction");
  const [searchQuery, setSearchQuery] = useState("");

  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);
  const optionsIsOpen = optionsAnchorEl == null ? false : true;

  const [directionAnchorEl, setDirectionAnchorEl] = useState(null);
  const directionIsOpen = directionAnchorEl == null ? false : true;

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
    return players;
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
      {playersList.isPending && <span>Loading...</span>}
      {playersList.data && (
        <div>
          <div className="sortMenu">
            <Typography variant="h6" component="h3">
              Sort Players:
            </Typography>
            <SortBar
              isOpen={optionsIsOpen}
              option={sortType}
              setOption={setSortType}
              anchorEl={optionsAnchorEl}
              setAnchorEl={setOptionsAnchorEl}
              options={SORT_OPTIONS}
            />
            <SortBar
              isOpen={directionIsOpen}
              option={sortDirection}
              setOption={setSortDirection}
              anchorEl={directionAnchorEl}
              setAnchorEl={setDirectionAnchorEl}
              options={SORT_DIRECTIONS}
            />
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <StatsTable playersList={playersDisplayed} />
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
