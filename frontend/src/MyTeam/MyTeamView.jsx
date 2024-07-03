import "./MyTeamView.css";
import Header from "../Header/Header.jsx";
import PlayerCardList from "./PlayerCardList.jsx";
import StatsTable from "../TableComponents/StatsTable";

function MyTeamView() {
  return (
    <div className="myTeamView">
      <Header />
      <StatsTable />
      <PlayerCardList />
    </div>
  );
}

export default MyTeamView;
