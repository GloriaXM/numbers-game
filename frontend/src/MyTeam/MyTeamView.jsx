import "./MyTeamView.css";
import Header from "../Header/Header.jsx";
import PlayerCardList from "./PlayerCardList.jsx";
import StatsTable from "../TableComponents/StatsTable";
import { useEffect, useState } from "react";

function MyTeamView() {
  return (
    <div className="myTeamView">
      <Header />
      <PlayerCardList myTeamStats={[]} />
      <StatsTable playersList={[]} />
    </div>
  );
}

export default MyTeamView;
