import "./PlayerCardList.css"
import PlayerCard from "./PlayerCard"

function PlayerCardList () {
    return (
        <div className="playerCardList">
            <PlayerCard/>
            <PlayerCard/>
            <PlayerCard/>
        </div>
    )
}

export default PlayerCardList
