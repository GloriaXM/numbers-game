import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import PlayersView from "./PlayersView/PlayersView";
import MyTeamView from "./MyTeam/MyTeamView";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import SinglePlayerView from "./SinglePlayer/SinglePlayerView";
import { UserContext } from "./UserContext";

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
          <Route path="/" element={user ? <PlayersView /> : <LoginForm />} />
          <Route exact path="/login" element={<LoginForm />}></Route>
          <Route exact path="/signup" element={<SignupForm />}></Route>
          <Route
            exact
            path="/Players"
            element={user ? <PlayersView /> : <LoginForm />}
          ></Route>
          <Route
            exact
            path="/MyTeam"
            element={user ? <MyTeamView /> : <LoginForm />}
          ></Route>
          <Route
            exact
            path="/player"
            element={user ? <SinglePlayerView /> : <LoginForm />}
          ></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
