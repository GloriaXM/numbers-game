import "./PlayerCardList.css";
import PlayerCard from "./PlayerCard";

function PlayerCardList({ playersStats }) {
  return (
    <div className="playerCardList">
      {playersStats.map((player, index) => {
        return <PlayerCard key={player.id} player={player} />;
      })}
    </div>
  );
}

export default PlayerCardList;
