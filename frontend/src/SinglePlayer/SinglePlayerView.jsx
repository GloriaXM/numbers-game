import Header from "../Header/Header";
import PlayerBanner from "./PlayerBanner";
import ModelView from "../Models/ModelView";
import StatsTable from "../TableComponents/StatsTable";
import { useState, useEffect } from "react";

function SinglePlayerView() {
  const currWindowPath = window.location.pathname;
  const playerName = currWindowPath.substring(8);
  const [bySeasonStats, setBySeasonStats] = useState([]);

  async function fetchPlayerDetails() {
    const response = await fetch(
      `https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`
    );
    const data = await response.json();
    setBySeasonStats(data.results);
    generateSummaryStats(data.results);
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
      <ModelView />
      <StatsTable playersList={bySeasonStats} />
    </div>
  );
}

export default SinglePlayerView;
