import Header from "../header/Header.jsx";
import PlayerBanner from "./PlayerBanner";
import ModelView from "../models/ModelView.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext.js";

function SinglePlayerView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const currWindowPath = window.location.pathname;
  const playerName = currWindowPath.substring(8);
  const [bySeasonStats, setBySeasonStats] = useState([]);
  const [byAggregateStats, setByAggregateStats] = useState([]);
  const userContext = useContext(UserContext);

  async function fetchPlayerDetails() {
    const response = await fetch(
      `https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`
    );
    const data = await response.json();
    setBySeasonStats(data.results);
    generateSummaryStats(data.results);
  }

  async function handleAddPlayer(event) {
    const playerType = event.target.id;
    const queryUrl = new URL(`${PORT}/${playerType}`);

    fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify({
        playerId: bySeasonStats[0].id,
        userId: userContext.user.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
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

  return (
    <div className="view singlePlayerView">
      <Header />
      <PlayerBanner player={byAggregateStats} />
      <Button id="myTeamPlayer" onClick={handleAddPlayer}>
        {" "}
        Add to MyTeam
      </Button>
      <Button id="opponent" onClick={handleAddPlayer}>
        {" "}
        Add to Opponents
      </Button>
      <ModelView careerData={bySeasonStats} />
      <StatsTable playersList={bySeasonStats} />
    </div>
  );
}

export default SinglePlayerView;
