import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Cadastro from './Cadastro/Login/Cadastro.jsx'
import NotFound from './Error/NotFound.jsx';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro' Component={Cadastro}/>
        <Route path='*' Component={NotFound}/>
      </Routes>
    </BrowserRouter>
)
}

export default App
