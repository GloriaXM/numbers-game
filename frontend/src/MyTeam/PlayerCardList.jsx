import "./PlayerCardList.css";
import PlayerCard from "./PlayerCard";

function PlayerCardList({ myTeamPlayers, playersStats }) {
  return (
    <div className="playerCardList">
      {playersStats.map((player, index) => {
        const performanceScore = myTeamPlayers[index].performanceScore;
        return (
          <PlayerCard
            key={player.id}
            player={player}
            performanceScore={performanceScore}
          />
        );
      })}
    </div>
  );
}

export default PlayerCardList;
