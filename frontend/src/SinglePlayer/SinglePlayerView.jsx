import Header from "../Header/Header";
import PlayerBanner from "./PlayerBanner";
import ModelView from "../Models/ModelView";
import StatsTable from "../TableComponents/StatsTable";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../UserContext.js";

function SinglePlayerView() {
  const currWindowPath = window.location.pathname;
  const playerName = currWindowPath.substring(8);
  const [bySeasonStats, setBySeasonStats] = useState([]);
  const userContext = useContext(UserContext);

  async function fetchPlayerDetails() {
    const response = await fetch(
      `https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`
    );
    const data = await response.json();
    setBySeasonStats(data.results);
    generateSummaryStats(data.results);
  }

  async function handleAddPlayer() {
    const queryUrl = new URL(`http://localhost:5000/myTeamPlayer`);
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

  function generateSummaryStats(careerStatsBySeason) {
    //TODO: aggregate data into summary stats
  }

  return (
    <div className="singlePlayerView">
      <Header />
      <PlayerBanner playerName={"playerName"} />
      <Button onClick={handleAddPlayer}> Add to MyTeam</Button>
      <ModelView />
      <StatsTable playersList={bySeasonStats} />
    </div>
  );
}

export default SinglePlayerView;
