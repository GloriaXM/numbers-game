import "./PlayerBanner.css";

function PlayerBanner({ aggregateStats }) {
  const playedGames = aggregateStats.games;

  return (
    <div className="playerBanner">
      <div className="bannerLeft">
        <h1 className="playerName playerBannerName">
          {" "}
          {aggregateStats.player_name}
        </h1>
        <h3 className="age">Age: {aggregateStats.age}</h3>
        <h3 className="team">Team: {aggregateStats.team}</h3>
      </div>
      <div className="details">
        <div className="row top">
          <h3 className="stat careerGamesPlayed">
            Career Games: {playedGames}
          </h3>
          <h3 className="stat careerGamesStarted">
            {" "}
            Games Started: {aggregateStats.games_started}
          </h3>
          <h3 className="stat pointsPerGame">
            PPG:{" "}
            {playedGames === 0
              ? 0
              : (aggregateStats.PTS / playedGames).toFixed(2)}
          </h3>
        </div>
        <div className="row middle">
          <h3 className="stat minutesPlayedPerGame">
            Min Per Game:{" "}
            {playedGames === 0
              ? 0
              : (aggregateStats.minutes_played / playedGames).toFixed(2)}
          </h3>
          <h3 className="stat fieldPercent">
            Field %:{" "}
            {aggregateStats.field_attempts === 0
              ? 0
              : (
                  (aggregateStats.field_goals / aggregateStats.field_attempts) *
                  100
                ).toFixed(2)}
          </h3>
          <h3 className="stat ftPercent">
            FT %:{" "}
            {aggregateStats.fta === 0
              ? 0
              : ((aggregateStats.ft / aggregateStats.fta) * 100).toFixed(2)}
          </h3>
        </div>
        <div className="row bottom">
          <h3 className="stat averageRebounds">
            Avg Rebounds:{" "}
            {playedGames === 0
              ? 0
              : (aggregateStats.TRB / playedGames).toFixed(2)}
          </h3>
          <h3 className="stat averageTurnovers">
            Avg Turnovers:{" "}
            {playedGames === 0
              ? 0
              : (aggregateStats.TOV / playedGames).toFixed(2)}
          </h3>
          <h3 className="stat averagePersonalFoulds">
            Avg Personal Fouls:{" "}
            {playedGames === 0
              ? 0
              : (aggregateStats.PF / playedGames).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PlayerBanner;
