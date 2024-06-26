import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Route, Routes } from 'react-router-dom';

import Header from "./Header/Header"
import MainView from './PlayersView/PlayerView'
import MyTeamView from './MyTeam/MyTeamView';

function App() {

  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route exact path='/Players' element={<MainView/>}></Route>
        <Route exact path='/MyTeam' element={<MyTeamView/>}></Route>
      </Routes>
    </div>
  )
}

export default App
