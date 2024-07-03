import Header from "../Header/Header";
import PlayerBanner from "./PlayerBanner";
import ModelView from "../Models/ModelView";
import StatsTable from "../TableComponents/StatsTable";

function SinglePlayerView() {
  return (
    <div className="singlePlayerView">
      <Header />
      <PlayerBanner />
      <ModelView />
      <StatsTable />
    </div>
  );
}

export default SinglePlayerView;
