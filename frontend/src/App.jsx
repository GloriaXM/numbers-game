import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Route, Routes } from 'react-router-dom';

import Home from './Home/Home'
import PlayerView from './PlayersView/PlayersView'
import MyTeamView from './MyTeam/MyTeamView';
import LoginPage from './auth/LoginPage';
import SignUpPage from "./auth/SignUpPage"
import SinglePlayerView from "./SinglePlayer/SinglePlayerView"

function App() {

  return (
    <div className="app">

      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<LoginPage/>}></Route>
        <Route exact path='/signup' element={<SignUpPage/>}></Route>
        <Route exact path='/Players' element={<PlayerView/>}></Route>
        <Route exact path='/MyTeam' element={<MyTeamView/>}></Route>
        <Route exact path='/player' element={<SinglePlayerView/>}></Route>
      </Routes>
    </div>
  )
}

export default App
