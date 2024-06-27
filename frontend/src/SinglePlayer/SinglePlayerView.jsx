import Header from "../Header/Header"
import PlayerBanner from "./PlayerBanner"
import ModelView from "../Models/ModelView"
import StatsTable from "../PlayersView/StatsTable"

function SinglePlayerView() {

return (
    <div className="singlePlayerView">
        <Header/>
        <PlayerBanner/>
        <ModelView/>
        <StatsTable/>
    </div>
)

}

export default SinglePlayerView
