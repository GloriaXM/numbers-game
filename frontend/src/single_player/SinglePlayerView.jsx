import Header from "../header/Header.jsx";
import PlayerBanner from "./PlayerBanner";
import LineGraph from "../models/LineChart.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext.js";
import { useQuery } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader.jsx";
import ShotChart from "./ShotChart.jsx";
import { PlayerStats } from "./PlayerStats.js";
import ErrorAlert from "../suspense/ErrorAlert.jsx";
import FeedbackAlert from "../suspense/FeedbackAlert.jsx";

function SinglePlayerView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const userContext = useContext(UserContext);
  const playerName = window.location.pathname.substring(8);
  const [displayServerError, setDisplayServerError] = useState(false);
  const [displayErrorFeedback, setDisplayErrorFeedback] = useState(null);

  const bySeasonStats = useQuery({
    queryKey: ["bySeasonStats"],
    queryFn: async () => {
      return await fetchPlayerDetails();
    },
  });
  const [byAggregateStats, setByAggregateStats] = useState([]);

  const SHOT_CHART_ROWS = 40;
  const SHOT_CHART_COLS = 40;
  const PIXEL_TO_REGION_SCALING_FACTOR = 500;

  const shotChartData = useQuery({
    queryKey: ["shotChartData"],
    queryFn: async () => {
      const data = await fetchShotChart();

      if (data.length === 0) {
        return null;
      }

      const shotCoordinates = extractShotCoordinates(data);
      const heatMapData = convertCoordinatesToHeat(shotCoordinates);

      return heatMapData;
    },
  });

  async function fetchPlayerDetails() {
    try {
      const response = await fetch(
        `https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`
      );
      const data = await response.json();
      generateSummaryStats(data.results);
      return data.results;
    } catch (error) {
      setDisplayServerError(true);
      console.error(error);
      return [];
    }
  }

  async function handleAddPlayer(event) {
    const playerType = event.target.id;
    const queryUrl = new URL(`${PORT}/player`);

    try {
      const response = await fetch(queryUrl, {
        method: "PATCH",
        body: JSON.stringify({
          playerType: playerType,
          playerId: bySeasonStats.data[0].id,
          userId: userContext.user.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const feedback = await response.json();
      setDisplayErrorFeedback(feedback.response);
    } catch (error) {
      setDisplayServerError(true);
      console.error(error);
    }
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
    const aggregateStats = new PlayerStats();
    aggregateStats.player_name = statsBySeason[0].player_name;
    aggregateStats.age = statsBySeason[0].age;
    aggregateStats.team = statsBySeason[0].team;

    statsBySeason.map((season) => {
      Object.keys(season).forEach(function (stat) {
        if (stat != "player_name" && stat !== "age" && stat !== "team") {
          aggregateStats[stat] += season[stat];
        }
      });
    });

    setByAggregateStats(aggregateStats);
  }

  function convertCoordinatesToHeat(shotCoordinates) {
    let shotMatrix = Array(SHOT_CHART_ROWS)
      .fill()
      .map(() => Array(SHOT_CHART_COLS).fill(0));

    shotCoordinates.forEach((coord) => {
      const row = Math.floor(
        coord.top / ((PIXEL_TO_REGION_SCALING_FACTOR - 100) / SHOT_CHART_COLS)
      );
      const col = Math.floor(
        coord.left / (PIXEL_TO_REGION_SCALING_FACTOR / SHOT_CHART_ROWS)
      );
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
    let queryUrl = new URL(
      `https://nba-stats-db.herokuapp.com/api/shot_chart_data/${playerName}/2023/`
    );
    try {
      const aggregateShotData = { results: [] };

      do {
        const response = await fetch(queryUrl);
        const data = await response.json();
        queryUrl = data.next;

        data.results.forEach((shot) => {
          aggregateShotData.results.push(shot);
        });
      } while (queryUrl !== null);

      return aggregateShotData.results;
    } catch (error) {
      setDisplayServerError(true);
      console.error(error);
    }
  }

  return (
    <div className="view singlePlayerView">
      <Header />
      {bySeasonStats.isPending && <AppLoader />}
      <ErrorAlert
        displayError={displayServerError}
        setDisplayError={setDisplayServerError}
      />
      <FeedbackAlert
        feedback={displayErrorFeedback}
        setDisplayFeedback={setDisplayErrorFeedback}
      />

      {bySeasonStats.data && (
        <div>
          <PlayerBanner aggregateStats={byAggregateStats} />
          <Button id="myTeamPlayers" onClick={handleAddPlayer}>
            {" "}
            Add to MyTeam
          </Button>
          <Button id="opponents" onClick={handleAddPlayer}>
            {" "}
            Add to Opponents
          </Button>
          <LineGraph careerData={bySeasonStats.data} />
        </div>
      )}

      {shotChartData.data == null && !shotChartData.isPending && (
        <h3>
          {" "}
          Shot chart not available for this player. Check Stephen Curry for an
          example
        </h3>
      )}

      {shotChartData.isPending && <h3> Loading Shot Chart ...</h3>}

      {shotChartData.data != null && (
        <ShotChart
          shotChartData={shotChartData.data}
          height={800}
          width={1000}
        />
      )}

      {bySeasonStats.data && <StatsTable playersList={bySeasonStats.data} />}
    </div>
  );
}

export default SinglePlayerView;
