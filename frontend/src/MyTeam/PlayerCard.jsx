import "./PlayerCard.css";

function PlayerCard({ player }) {
  return (
    <div className="playerCard">
      <div className="cardHeader">
        <h2 className="playerName"> {player.player_name}</h2>
        <h1 className="performanceScore"> {player.performanceScore}</h1>
      </div>

      <div className="summaryStatsBar">
        <h3 className="stat gamesPlayed">Games Played: {player.games}</h3>
        <h3 className="stat pointsPerGame">
          PPG: {player.games === 0 ? 0 : (player.PTS / player.games).toFixed(2)}
        </h3>
        <h3 className="stat fieldPercent">
          Effect FG %: {(100 * parseFloat(player.field_percent)).toFixed(2)}
        </h3>
      </div>
      <div className="hiddenStatsBar">
        <h3 className="stat fieldPercent">
          Field %: {(100 * player.three_percent).toFixed(2)}
        </h3>
        <h3 className="stat threePercent">
          Three %: {(100 * player.three_percent).toFixed(2)}
        </h3>
        <h3 className="stat twoPercent">
          Two %: {(100 * player.two_percent).toFixed(2)}
        </h3>
        <h3 className="stat ftPercent">
          FT %: {(100 * player.ft_percent).toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default PlayerCard;
