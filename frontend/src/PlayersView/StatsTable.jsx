import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./StatsTable.css";

function createData(
  player_name,
  minutes_played,
  field_goals,
  field_attempts,
  field_percent,
  three_makes
) {
  return {
    player_name,
    minutes_played,
    field_goals,
    field_attempts,
    field_percent,
    three_makes,
  };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function isOld(player) {
  const MAX_UPDATE_TIME = 5 * 60 * 1000;
  const offset = new Date();
  offset.setTime(Date.now() - MAX_UPDATE_TIME);

  return player.createdAt <= offset;
}

async function fetchPlayer(id) {
  const response = await fetch(`http://localhost:5000/player/${id}`);
  const data = await response.json();
  const player = data.results;
  return player;
}

async function handleFetchPlayers() {
  const response = await fetch(
    "https://nba-stats-db.herokuapp.com/api/playerdata/season/2023"
  );
  const data = await response.json();
  const loadedPlayers = data.results;

  for (const player in loadedPlayers) {
    const existingPlayer = await fetchPlayer(player.id);

    if (!existingPlayer || isOld(existingPlayer)) {
      fetch("http://localhost:5000/players", {
        method: "POST",
        body: JSON.stringify({
          title: document.getElementById("inputTitle").value,
          note: document.getElementById("inputNote").value,
          author: document.getElementById("inputAuthor").value,
          gifSrc: currGif,
          upvotes: 0,
          boardId: displayedBoardId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    }
  }
}

function StatsTable() {
  return (
    <>
      <TableContainer className="statsTable" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell align="right">Minutes Played</TableCell>
              <TableCell align="right">Field Makes</TableCell>
              <TableCell align="right">Field Attempts</TableCell>
              <TableCell align="right">Field %</TableCell>
              <TableCell align="right">Three Makes</TableCell>
              <TableCell align="right">Three Makes</TableCell>
              <TableCell align="right">Three Attempts</TableCell>
              <TableCell align="right">Threes %</TableCell>
              <TableCell align="right">Two Makes</TableCell>
              <TableCell align="right">Two Attempts</TableCell>
              <TableCell align="right">Twos %</TableCell>
              <TableCell align="right">Effective FG %</TableCell>
              <TableCell align="right">Free Throw Makes</TableCell>
              <TableCell align="right">FT Attempt</TableCell>
              <TableCell align="right">FT %</TableCell>
              <TableCell align="right">ORB</TableCell>
              <TableCell align="right">DRB</TableCell>
              <TableCell align="right">TRB</TableCell>
              <TableCell align="right">AST</TableCell>
              <TableCell align="right">STL</TableCell>
              <TableCell align="right">BLK</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={handleFetchPlayers}>Fetch Players</button>
    </>
  );
}

export default StatsTable;
