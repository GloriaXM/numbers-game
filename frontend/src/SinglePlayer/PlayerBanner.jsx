import "./PlayerBanner.css";

function PlayerBanner({ playerName }) {
  return (
    <div className="playerBanner">
      <div>
        <img src="src/assets/movie.png" />
        <h2> Player Name</h2>
      </div>
      <div>
        <h1> {playerName}</h1>
      </div>
    </div>
  );
}

export default PlayerBanner;
