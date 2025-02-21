import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Cadastro from './Cadastro/Login/Cadastro.jsx'
import NotFound from './Error/NotFound.jsx';
import Home from './Manager/Home.jsx';
import Teamcreate from './Manager/Teamcreate.jsx'
import TeamView from './Manager/TeamView.jsx'
import Login from './Cadastro/Login/Login.jsx'
import e404 from './Universal/e404.jsx';
import Teste from './Teste/teste.jsx';

import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import { UserContextProvider} from '../context/userContext.jsx';
import WithAuth from "./util/withAuth"; // Importação correta



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
          <Route path='/teste' Component={Teste}/>


          {/* //manager route */}
          {/*<Route path='/' Component={Home}/> */}
          <Route element={<WithAuth />}>

            <Route path="/" element={<Home />} /> 
            <Route path='/teamcreate' element={<Teamcreate/>}/>
            <Route path='/teamview' Component={TeamView}/>
              

          </Route>
          
          {/* //player route */}
          <Route path='*' Component={e404}/>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
)
}

export default App
