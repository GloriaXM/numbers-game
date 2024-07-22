import Header from "../header/Header.jsx";
import PlayerBanner from "./PlayerBanner";
import ModelView from "../models/ModelView.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext.js";
import { useQuery } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader.jsx";

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
      {bySeasonStats.isPending && <AppLoader />}
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
          <StatsTable playersList={bySeasonStats.data} />
        </div>
      )}
    </div>
  );
}

export default SinglePlayerView;
