import Header from "../header/Header.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";
import ScoutOpponent from "../opponent/ScoutOpponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader.jsx";

function MyTeamView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const [displayScout, setDisplayScout] = useState(false);
  const [recommendations, setRecommendations] = useState({
    bestPlayers: [],
    response: { keyPoints: [], areasOfImprovement: [] },
  });
  const myTeamPlayers = useQuery({
    queryKey: ["myTeamPlayers"],
    queryFn: async () => {
      return await fetchTeamPlayers("myTeamPlayers");
    },
  });
  const opponents = useQuery({
    queryKey: ["opponents"],
    queryFn: async () => {
      return await fetchTeamPlayers("opponents");
    },
  });
  const userContext = useContext(UserContext);

  async function fetchTeamPlayers(teamType) {
    const queryUrl = new URL(`${PORT}/teamPlayers`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    queryUrl.searchParams.append("teamType", teamType);
    const response = await fetch(queryUrl);

    const data = await response.json();
    return data[teamType];
  }

  async function handleScoutClick() {
    setDisplayScout(true);
    const queryUrl = new URL(`${PORT}/scoutOpponent`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    const response = await fetch(queryUrl);
    const results = await response.json();
    setRecommendations(results);
  }

  //TODO: implement better UI feedback on recommending ideal players

  return (
    <div className="view myTeamView">
      <Header />
      {myTeamPlayers.isPending && <AppLoader />}
      {myTeamPlayers.data && (
        <div className="playerCardList">
          {myTeamPlayers.data.map((player) => {
            return (
              <PlayerCard
                key={player.id}
                player={player}
                teamPlayers={myTeamPlayers.data}
                userId={userContext.user.id}
                teamType="myTeamPlayers"
                refetchPlayers={myTeamPlayers.refetch}
              />
            );
          })}
        </div>
      )}

      {!displayScout && (
        <button onClick={handleScoutClick}> Scout Opponent</button>
      )}

      {displayScout && (
        <ScoutOpponent
          setDisplay={setDisplayScout}
          myTeamPlayers={myTeamPlayers.data}
          opponentPlayers={opponents.data}
          recommendations={recommendations.response}
          refetchPlayers={opponents.refetch}
        />
      )}
      {myTeamPlayers.data && <StatsTable playersList={myTeamPlayers.data} />}
    </div>
  );
}

export default MyTeamView;
