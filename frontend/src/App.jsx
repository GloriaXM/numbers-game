import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from "./Header/Header"
import MainView from './MainView/MainView'


function App() {

  return (
    <div className="app">
      <Header/>
      <MainView/>
    </div>
  )
}

export default App
