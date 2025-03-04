import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import PlayersView from "./players_view/PlayersView";
import MyTeamView from "./my_team/MyTeamView";
import SinglePlayerView from "./single_player/SinglePlayerView";
import { UserContext } from "./UserContext";
import LoginSignup from "./auth/LoginSignup";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <div className="app">
      <UserContext.Provider value={{ user, updateUser }}>
        <Routes>
          <Route
            path="/"
            element={user ? <PlayersView /> : <LoginSignup loginForm={true} />}
          />

          <Route
            exact
            path="/login"
            element={<LoginSignup loginForm={true} />}
          />

          <Route
            exact
            path="/signup"
            element={<LoginSignup loginForm={false} />}
          />

          <Route
            exact
            path="/Players"
            element={user ? <PlayersView /> : <LoginSignup loginForm={true} />}
          />

          <Route
            exact
            path="/MyTeam"
            element={user ? <MyTeamView /> : <LoginSignup loginForm={true} />}
          />
          <Route
            path="/player/:id"
            element={
              user ? <SinglePlayerView /> : <LoginSignup loginForm={true} />
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
