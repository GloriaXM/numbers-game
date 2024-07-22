import Header from "../header/Header.jsx";
import PlayerBanner from "./PlayerBanner";
import ModelView from "../models/ModelView.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext.js";
import { useQuery } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader.jsx";
import ShotChart from "./ShotChart.jsx";

function SinglePlayerView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const currWindowPath = window.location.pathname;
  const playerName = currWindowPath.substring(8);
  const bySeasonStats = useQuery({
    queryKey: ["bySeasonStats"],
    queryFn: async () => {
      return await fetchPlayerDetails();
    },
  });
  const [byAggregateStats, setByAggregateStats] = useState([]);
  const userContext = useContext(UserContext);
  const SHOT_CHART_ROWS = 8;
  const SHOT_CHART_COLS = 10;
  const shotChartData = useQuery({
    queryKey: ["shotChartData"],
    queryFn: async () => {
      const data = await fetchShotChart();
      if (data.count === 0) {
        return null;
      }
      const shotCoordinates = extractShotCoordinates(data.results);
      const heatMapData = convertCoordinatesToHeat(shotCoordinates);

      return heatMapData;
    },
  });

  async function fetchPlayerDetails() {
    const response = await fetch(
      `https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`
    );
    const data = await response.json();
    generateSummaryStats(data.results);
    return data.results;
  }

  async function handleAddPlayer(event) {
    const playerType = event.target.id;
    const queryUrl = new URL(`${PORT}/player`);

    fetch(queryUrl, {
      method: "PATCH",
      body: JSON.stringify({
        playerType: playerType,
        playerId: bySeasonStats.data[0].id,
        userId: userContext.user.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  }

  function extractShotCoordinates(shotsData) {
    const shotCoordinates = shotsData.map((shot) => {
      return { top: shot.top, left: shot.left, result: shot.result };
    });

    return shotCoordinates;
  }

  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  function generateSummaryStats(statsBySeason) {
    let aggregateStats = ["", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0];
    aggregateStats[0] = statsBySeason[0].player_name;
    aggregateStats[12] = statsBySeason[0].age;
    aggregateStats[13] = statsBySeason[0].team;

    statsBySeason.map((season) => {
      aggregateStats[1] += season.games;
      aggregateStats[2] += season.PTS;
      aggregateStats[3] += season.games_started;
      aggregateStats[4] += season.minutes_played;
      aggregateStats[5] += season.field_goals;
      aggregateStats[6] += season.field_attempts;
      aggregateStats[7] += season.ft;
      aggregateStats[8] += season.fta;
      aggregateStats[9] += season.TRB;
      aggregateStats[10] += season.TOV;
      aggregateStats[11] += season.PF;
    });

    setByAggregateStats(aggregateStats);
  }

  function convertCoordinatesToHeat(shotCoordinates) {
    let shotMatrix = Array(SHOT_CHART_ROWS)
      .fill()
      .map(() => Array(SHOT_CHART_COLS).fill(0));

    shotCoordinates.forEach((coord) => {
      const row = Math.floor(coord.top / 50);
      const col = Math.floor(coord.left / 50);
      shotMatrix[row][col] += 1;
    });

    const resultHeatMap = [];
    shotMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        resultHeatMap.push({ top: rowIndex, left: colIndex, value: cell });
      });
    });
    return resultHeatMap;
  }

  async function fetchShotChart() {
    try {
      const response = await fetch(
        `https://nba-stats-db.herokuapp.com/api/shot_chart_data/${playerName}/2023/`
      );
      const data = await response.json();
      return data;
    } catch {}
  }

  return (
    <div className="view singlePlayerView">
      <Header />
      {bySeasonStats.isPending || (shotChartData.isPending && <AppLoader />)}
      {bySeasonStats.data && (
        <div>
          <PlayerBanner player={byAggregateStats} />
          <Button id="myTeamPlayers" onClick={handleAddPlayer}>
            {" "}
            Add to MyTeam
          </Button>
          <Button id="opponents" onClick={handleAddPlayer}>
            {" "}
            Add to Opponents
          </Button>
          <ModelView careerData={bySeasonStats.data} />
        </div>
      )}
      {shotChartData.data == null && !shotChartData.isPending && (
        <h3> Shot chart not available for this player</h3>
      )}
      {shotChartData.isFetched && (
        <ShotChart shotChartData={shotChartData.data} />
      )}
      {bySeasonStats.data && <StatsTable playersList={bySeasonStats.data} />}
    </div>
  );
}

export default SinglePlayerView;
