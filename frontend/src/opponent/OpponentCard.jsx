function OpponentCard({ player }) {
  return (
    <div className="opponentCard">
      <h2> {player.playerName}</h2>
      <h2> {player.outsideOffenseScore}</h2>
      <h2> playing style</h2>
    </div>
  );
}

export default OpponentCard;
