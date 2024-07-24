import Header from "../header/Header.jsx";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";
import ScoutOpponent from "../opponent/ScoutOpponent.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader.jsx";

function MyTeamView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const userContext = useContext(UserContext);
  const queryClient = useQueryClient();

  const [displayScout, setDisplayScout] = useState(false);

  const recommendations = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const queryUrl = new URL(`${PORT}/scoutOpponent`);
      queryUrl.searchParams.append("userId", userContext.user.id);
      const response = await fetch(queryUrl);
      const results = await response.json();
      return results;
    },
  });

  const [style, setStyle] = useState("outsideOffenseScore");
  const myTeamPlayers = useQuery({
    queryKey: ["myTeamPlayers", style],
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

  async function fetchTeamPlayers(teamType) {
    const queryUrl = new URL(`${PORT}/teamPlayers`);
    queryUrl.searchParams.append("userId", userContext.user.id);
    queryUrl.searchParams.append("teamType", teamType);
    queryUrl.searchParams.append("playingStyle", style);
    const response = await fetch(queryUrl);

    const data = await response.json();
    return data[teamType];
  }

  async function handleScoutClick() {
    setDisplayScout(true);
  }

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

      {displayScout && recommendations.data && myTeamPlayers.isFetched && (
        <ScoutOpponent
          setDisplay={setDisplayScout}
          myTeamPlayers={myTeamPlayers.data}
          opponentPlayers={opponents.data}
          recommendations={recommendations.data.response}
          refetchPlayers={opponents.refetch}
          refetchMyTeam={myTeamPlayers.refetch}
          myTeamStyle={style}
          setMyTeamStyle={setStyle}
        />
      )}
      {myTeamPlayers.data && <StatsTable playersList={myTeamPlayers.data} />}
    </div>
  );
}

export default MyTeamView;
