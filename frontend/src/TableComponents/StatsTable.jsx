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
                  <Link href={`/player/${player.player_name}`}>
                    {player.player_name}
                  </Link>
                </TableCell>
                <TableCell align="right">{player.minutes_played}</TableCell>
                <TableCell align="right">{player.field_goals}</TableCell>
                <TableCell align="right">{player.field_attempts}</TableCell>
                <TableCell align="right">
                  {typeof player.field_percent === "number"
                    ? (player.field_percent * 100).toFixed(2)
                    : player.field_percent}
                </TableCell>
                <TableCell align="right">{player.three_fg}</TableCell>
                <TableCell align="right">{player.three_attempts}</TableCell>
                <TableCell align="right">
                  {typeof player.three_percent === "number"
                    ? (player.three_percent * 100).toFixed(2)
                    : player.three_percent}
                </TableCell>
                <TableCell align="right">{player.two_fg}</TableCell>
                <TableCell align="right">{player.two_attempts}</TableCell>
                <TableCell align="right">
                  {typeof player.two_percent === "number"
                    ? (player.two_percent * 100).toFixed(2)
                    : player.two_percent}
                </TableCell>
                <TableCell align="right">{player.effect_fg_percent}</TableCell>
                <TableCell align="right">{player.ft}</TableCell>
                <TableCell align="right">{player.fta}</TableCell>
                <TableCell align="right">
                  {typeof player.effect_fg_percent === "number"
                    ? (player.effect_fg_percent * 100).toFixed(2)
                    : player.effect_fg_percent}
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
