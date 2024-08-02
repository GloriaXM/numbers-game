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
import TableColumn from "./TableColumn";

function StatsTable({ playersList, setSortType, setSortDirection, sortType }) {
  const stats = [
    { stat: "player_name", statName: "Player Name" },
    { stat: "season", statName: "Season" },
    { stat: "PTS", statName: "Points" },
    { stat: "minutes_played", statName: "Minutes" },
    { stat: "field_goals", statName: "Field Makes" },
    { stat: "field_attempts", statName: "Field Attempts" },
    { stat: "field_percent", statName: "Field %" },
    { stat: "three_fg", statName: "Three Makes" },
    { stat: "three_attempts", statName: "Three Attempts" },
    { stat: "three_percent", statName: "Three %" },
    { stat: "two_fg", statName: "Two Makes" },
    { stat: "two_attempts", statName: "Two Attempts" },
    { stat: "two_percent", statName: "Twos %" },
    { stat: "effect_fg_percent", statName: "Effective FG %" },
    { stat: "ft", statName: "Free Throw Makes" },
    { stat: "fta", statName: "FT Attempt" },
    { stat: "ft_percent", statName: "FT %" },
    { stat: "ORB", statName: "ORB" },
    { stat: "DRB", statName: "DRB" },
    { stat: "TRB", statName: "TRB" },
    { stat: "AST", statName: "AST" },
    { stat: "STL", statName: "STL" },
    { stat: "BLK", statName: "BLK" },
  ];

  return (
    <>
      <TableContainer className="statsTable" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {stats.map((stat) => {
                return (
                  <TableColumn
                    className="columnHeader"
                    stat={stat.stat}
                    statName={stat.statName}
                    setSortType={setSortType}
                    setSortDirection={setSortDirection}
                    sortType={sortType}
                  />
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {playersList.map((player) => (
              <TableRow
                key={player.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="playerName">
                    <Link href={`/player/${player.player_name}`}>
                      {player.player_name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell align="right">
                  {player.season == null ? 2023 : player.season}
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
                <TableCell align="right">
                  {typeof player.effect_fg_percent === "number"
                    ? (player.effect_fg_percent * 100).toFixed(2)
                    : (parseFloat(player.effect_fg_percent) * 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">{player.ft}</TableCell>
                <TableCell align="right">{player.fta}</TableCell>
                <TableCell align="right">
                  {typeof player.ft_percent === "number"
                    ? (player.ft_percent * 100).toFixed(2)
                    : player.ft_percent}
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
