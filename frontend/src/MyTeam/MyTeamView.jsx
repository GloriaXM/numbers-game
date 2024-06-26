import "./MyTeamView.css"
import Header from "../Header/Header.jsx"
import PlayerCardList from "./PlayerCardList.jsx"
import TeamStats from "./TeamStats.jsx"

function MyTeamView() {

  return (
    <div className="myTeamView">
      <Header/>
      <TeamStats/>
      <PlayerCardList/>
    </div>
  )
}

export default MyTeamView
