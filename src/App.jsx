import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Cadastro from './Cadastro/Login/Cadastro.jsx'
import NotFound from './Error/NotFound.jsx';
import Home from './Manager/Home.jsx';
import HomePlayer from './Player/HomePlayer.jsx';
import Teamcreate from './Manager/Teamcreate.jsx'
import TeamView from './Manager/TeamView.jsx'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* //General route */}
        <Route path='/cadastro' Component={Cadastro}/>


        {/* //manager route */}
        <Route path='/home' Component={Home}/>
        <Route path='/teamcreate' Component={Teamcreate}/>
        <Route path='/teamview' Component={TeamView}/>


        {/* //player route */}
        <Route path='/homep' Component={HomePlayer}/>
        <Route path='*' Component={NotFound}/>
      </Routes>
    </BrowserRouter>
)
}

export default App
