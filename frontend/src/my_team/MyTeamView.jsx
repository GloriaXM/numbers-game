import Header from "../header/Header";
import StatsTable from "../table_components/StatsTable.jsx";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext.js";
import PlayerCard from "./PlayerCard.jsx";
import ScoutOpponent from "../opponent/ScoutOpponent.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppLoader } from "../suspense/AppLoader.jsx";
import ErrorAlert from "../suspense/ErrorAlert.jsx";
import { Typography } from "@mui/material";

function MyTeamView() {
  const PORT = import.meta.env.VITE_BACKEND_PORT;
  const userContext = useContext(UserContext);

  const [displayScout, setDisplayScout] = useState(false);
  const [displayServerError, setDisplayServerError] = useState(false);

  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const recommendations = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const queryUrl = new URL(`${PORT}/scoutOpponent`);
      queryUrl.searchParams.append("userId", userContext.user.id);
      try {
        const response = await fetch(queryUrl);
        const results = await response.json();
        return results;
      } catch (error) {
        setDisplayServerError(true);
        console.error(error);
      }
    },
  });

  const [style, setStyle] = useState("");
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
    queryUrl.searchParams.append("sortType", sortType);
    queryUrl.searchParams.append("sortDirection", sortDirection);

    const sortStyle =
      style === ""
        ? recommendations.data.response.recommendedStyle.style
        : style;
    queryUrl.searchParams.append("playingStyle", sortStyle);

    try {
      const response = await fetch(queryUrl);

      const data = await response.json();
      return data[teamType];
    } catch (error) {
      setDisplayServerError(true);
      console.error(error);
      return [];
    }
  }

  async function handleScoutClick() {
    if (opponents.data.length > 0) {
      setDisplayScout(true);
    }
  }

  useEffect(() => {
    myTeamPlayers.refetch();
  }, [sortType, sortDirection]);

  return (
    <div className="view myTeamView">
      <Header />

      <ErrorAlert
        displayError={displayServerError}
        setDisplayError={setDisplayServerError}
      />

      {myTeamPlayers.isPending && <AppLoader />}

      {myTeamPlayers.data && myTeamPlayers.data.length == 0 && (
        <Typography variant="h5">
          {" "}
          Use the Players page to find and add players to your team
        </Typography>
      )}

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

      {opponents.data && opponents.data.length == 0 && (
        <Typography>
          {" "}
          Add players to opponent team to see scouting view
        </Typography>
      )}

      {!displayScout &&
        myTeamPlayers.data &&
        myTeamPlayers.data.length > 0 &&
        recommendations.data && (
          <button onClick={handleScoutClick}> Scout Opponent</button>
        )}

      {displayScout &&
        myTeamPlayers.data &&
        myTeamPlayers.data.length > 0 &&
        recommendations.data && (
          <ScoutOpponent
            setDisplay={setDisplayScout}
            myTeamPlayers={myTeamPlayers.data}
            opponentPlayers={opponents.data}
            recommendations={recommendations.data.response}
            refetchPlayers={opponents.refetch}
            refetchMyTeam={myTeamPlayers.refetch}
            myTeamStyle={
              style === ""
                ? recommendations.data.response.recommendedStyle.style
                : style
            }
            setMyTeamStyle={setStyle}
          />
        )}
      {myTeamPlayers.data && myTeamPlayers.data.length != 0 && (
        <StatsTable
          playersList={myTeamPlayers.data}
          setSortType={setSortType}
          setSortDirection={setSortDirection}
          sortType={sortType}
        />
      )}
    </div>
  );
}

export default MyTeamView;
