import "./PlayerCard.css";

function PlayerCard({ player }) {
  return (
    <div className="playerCard">
      <div className="cardHeader">
        <h1> {player.player_name}</h1>
        <h1> {player.performanceScore}</h1>
      </div>
      <div className="summaryStatsBar">
        <h3 className="stat gamesPlayed">Games Played: {player.games}</h3>
        <h3 className="stat pointsPerGame">
          PPG: {player.games === 0 ? 0 : (player.PTS / player.games).toFixed(2)}
        </h3>
        <h3 className="stat fieldPercent">
          Field %: {(100 * player.field_percent).toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default PlayerCard;
