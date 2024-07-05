import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./StatsTable.css";
import Link from "@mui/material/Link";

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

function StatsTable({ playersList }) {
  return (
    <>
      <TableContainer className="statsTable" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell align="right">Minutes</TableCell>
              <TableCell align="right">Field Makes</TableCell>
              <TableCell align="right">Field Attempts</TableCell>
              <TableCell align="right">Field %</TableCell>
              <TableCell align="right">Three Makes</TableCell>
              <TableCell align="right">Three Attempts</TableCell>
              <TableCell align="right">Three %</TableCell>
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
            {playersList.map((player) => (
              <TableRow
                key={player.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link href={`/player/${player.player_name}`}>Here</Link>
                </TableCell>
                <TableCell align="right">{player.minutes_played}</TableCell>
                <TableCell align="right">{player.field_goals}</TableCell>
                <TableCell align="right">{player.field_attempts}</TableCell>
                <TableCell align="right">
                  {(player.field_percent * 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">{player.three_fg}</TableCell>
                <TableCell align="right">{player.three_attempts}</TableCell>
                <TableCell align="right">
                  {player.three_percent.toFixed(2)}
                </TableCell>
                <TableCell align="right">{player.two_fg}</TableCell>
                <TableCell align="right">{player.two_attempts}</TableCell>
                <TableCell align="right">
                  {player.two_percent.toFixed(2)}
                </TableCell>
                <TableCell align="right">{player.effect_fg_percent}</TableCell>
                <TableCell align="right">{player.ft}</TableCell>
                <TableCell align="right">{player.fta}</TableCell>
                <TableCell align="right">
                  {player.ft_percent.toFixed(2)}
                </TableCell>
                <TableCell align="right">{player.ORB}</TableCell>
                <TableCell align="right">{player.DRB}</TableCell>
                <TableCell align="right">{player.TRB}</TableCell>
                <TableCell align="right">{player.AST}</TableCell>
                <TableCell align="right">{player.STL}</TableCell>
                <TableCell align="right">{player.BLK}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StatsTable;
