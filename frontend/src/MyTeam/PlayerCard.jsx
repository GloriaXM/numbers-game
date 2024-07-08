import "./PlayerCard.css";
import { useState } from "react";

function PlayerCard({ player, setMyTeamPlayers, myTeamPlayers }) {
  function onDeleteClick() {
    setDisplayDeleteModal(true);
  }

  async function handleDeleteCard(e) {
    setDisplayDeleteModal(false);

    const queryUrl = new URL(`http://localhost:5000/singlePlayerStats`);
    await fetch(queryUrl, {
      method: "DELETE",
      body: JSON.stringify({
        playerId: player.myTeamId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setMyTeamPlayers(
      myTeamPlayers.filter(function (existingPlayer) {
        return existingPlayer.id != player.myTeamId;
      })
    );
  }

  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
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
        <div className="statRow">
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

        <button className="deleteButton" onClick={onDeleteClick}>
          Delete
        </button>
        <div
          className="deleteCard"
          style={{ display: displayDeleteModal ? "block" : "none" }}
        >
          <div className="deleteCardContent">
            <p> Are you sure?</p>
            <button
              className="cancelDelete"
              onClick={() => {
                setDisplayDeleteModal(false);
              }}
            >
              No, Cancel
            </button>
            <button className="confirmDelete" onClick={handleDeleteCard}>
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
