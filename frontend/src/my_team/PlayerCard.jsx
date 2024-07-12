import "./PlayerCard.css";
import { useState } from "react";

function PlayerCard({ player, setMyTeamPlayers, myTeamPlayers }) {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [flipCard, setFlipCard] = useState(false);

  function onDeleteClick(event) {
    event.stopPropagation();
    setDisplayDeleteModal(true);
  }

  async function handleDeleteCard(event) {
    event.stopPropagation();
    setDisplayDeleteModal(false);

    const queryUrl = new URL(`${PORT}/singlePlayerStats`);
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

  function handleFlipCard() {
    setFlipCard(!flipCard);
    setDisplayDeleteModal(false);
  }

  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  return (
    <div className="scene">
      <div
        className={`playerCard ${flipCard}`}
        onClick={handleFlipCard}
        style={{ transform: flipCard ? "rotateY(180deg)" : "" }}
      >
        <div className="card__face card__face--front">
          <h2 className="playerCardName"> {player.player_name}</h2>
        </div>
        <div className="card__face card__face--back">
          <div className="summaryStatsBar">
            <h3 className="stat gamesPlayed">Games Played: {player.games}</h3>
            <h3 className="stat pointsPerGame">
              PPG:{" "}
              {player.games === 0 ? 0 : (player.PTS / player.games).toFixed(2)}
            </h3>
            <h3 className="stat fieldPercent">
              Effect FG %: {(100 * parseFloat(player.field_percent)).toFixed(2)}
            </h3>
          </div>
          <div className="secondStatsRow">
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

            <button className="delete button" onClick={onDeleteClick}>
              Delete
            </button>
            <div
              className="deleteCard"
              style={{ display: displayDeleteModal ? "block" : "none" }}
            >
              <div className="deleteCardContent">
                <h2> Confirm Delete</h2>
                <button
                  className="button cancelDelete"
                  onClick={(event) => {
                    event.stopPropagation();
                    setDisplayDeleteModal(false);
                  }}
                >
                  No, Cancel
                </button>
                <button
                  className="delete button confirmDelete"
                  onClick={handleDeleteCard}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
