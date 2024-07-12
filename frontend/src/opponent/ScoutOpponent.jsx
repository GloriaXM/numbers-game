import OpponentCard from "./OpponentCard";

function ScoutOpponent({ setDisplay, opponents }) {
  function closeScout() {
    setDisplay(false);
  }

  return (
    <div>
      <button onClick={closeScout}> X</button>
      <h1> Scout opponent</h1>
      {opponents.map((player) => {
        return <OpponentCard player={player} />;
      })}
    </div>
  );
}

export default ScoutOpponent;
