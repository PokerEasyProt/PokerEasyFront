import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Cadastro from './Cadastro/Login/Cadastro.jsx'
import NotFound from './Error/NotFound.jsx';
import Home from './Manager/Home.jsx';
import HomePlayer from './Player/HomePlayer.jsx';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro' Component={Cadastro}/>
        <Route path='/home' Component={Home}/>
        <Route path='/homep' Component={HomePlayer}/>
        <Route path='*' Component={NotFound}/>
      </Routes>
    </BrowserRouter>
)
}

export default App
