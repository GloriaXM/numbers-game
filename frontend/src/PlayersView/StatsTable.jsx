import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(player_name, minutes_played, field_goals, field_attempts, field_percent, three_makes) {
  return { player_name, minutes_played, field_goals, field_attempts, field_percent, three_makes};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function StatsTable() {
  return (
    <TableContainer component={Paper}>
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatsTable
