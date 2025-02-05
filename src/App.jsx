import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Cadastro from './Cadastro/Login/Cadastro.jsx'
import NotFound from './Error/NotFound.jsx';
import Home from './Manager/Home.jsx';
import HomePlayer from './Player/HomePlayer.jsx';
import Teamcreate from './Manager/Teamcreate.jsx'
import TeamView from './Manager/TeamView.jsx'
import Login from './Cadastro/Login/Login.jsx'

import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext.jsx';



axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true


function App() {
  return(
    <UserContextProvider>
      <BrowserRouter>
        <Toaster position='botton-right' toastOptions={{duration: 2000}}/>
        <Routes>
          {/* //General route */}
          <Route path='/cadastro' Component={Cadastro}/>
          <Route path='/login' Component={Login}/>


          {/* //manager route */}
          <Route path='/' Component={Home}/>
          <Route path='/teamcreate' Component={Teamcreate}/>
          <Route path='/teamview' Component={TeamView}/>


          {/* //player route */}
          <Route path='/homep' Component={HomePlayer}/>
          <Route path='*' Component={Cadastro}/>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
)
}

export default App
