import "./PlayerBanner.css";

function PlayerBanner({ player }) {
  const playedGames = player[1];

  return (
    <div className="playerBanner">
      <div className="playerCard">
        <h1 className="playerName"> {player[0]}</h1>
        <h3 className="age">Age: {player[12]}</h3>
        <h3 className="team">Team: {player[13]}</h3>
      </div>
      <div className="details">
        <h3 className="stat careerGamesPlayed">Career Games: {player[1]}</h3>
        <h3 className="stat careerGamesStarted"> Games Started: {player[3]}</h3>
        <h3 className="stat pointsPerGame">
          PPG: {playedGames === 0 ? 0 : (player[2] / playedGames).toFixed(2)}
        </h3>
        <h3 className="stat minutesPlayedPerGame">
          Min Per Game:{" "}
          {playedGames === 0 ? 0 : (player[4] / playedGames).toFixed(2)}
        </h3>
        <h3 className="stat fieldPercent">
          Field %:{" "}
          {player[6] === 0 ? 0 : ((player[5] / player[6]) * 100).toFixed(2)}
        </h3>
        <h3 className="stat ftPercent">
          FT %:{" "}
          {player[8] === 0 ? 0 : ((player[7] / player[8]) * 100).toFixed(2)}
        </h3>
        <h3 className="stat averageRebounds">Avg Rebounds: {player[9]}</h3>
        <h3 className="stat averageTurnovers">Avg Turnovers: {player[10]}</h3>
        <h3 className="stat averagePersonalFoulds">
          Avg Personal Fouls: {player[11]}
        </h3>
      </div>
    </div>
  );
}

export default PlayerBanner;
