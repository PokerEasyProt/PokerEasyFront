import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Cadastro from './Cadastro/Login/Cadastro.jsx'
import NotFound from './Error/NotFound.jsx';
import Home from './Manager/Home.jsx';
import HomePlayer from './Player/HomePlayer.jsx';
import Teamcreate from './Manager/Teamcreate.jsx'
import TeamView from './Manager/TeamView.jsx'
import Login from './Cadastro/Login/Login.jsx'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* //General route */}
        <Route path='/cadastro' Component={Cadastro}/>
        <Route path='/login' Component={Login}/>


        {/* //manager route */}
        <Route path='/home' Component={Home}/>
        <Route path='/teamcreate' Component={Teamcreate}/>
        <Route path='/teamview' Component={TeamView}/>


        {/* //player route */}
        <Route path='/homep' Component={HomePlayer}/>
        <Route path='*' Component={Cadastro}/>
      </Routes>
    </BrowserRouter>
)
}

export default App
