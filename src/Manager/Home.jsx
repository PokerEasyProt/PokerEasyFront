import Top from "../Universal/Top"
import Nav from '../Universal/Nav'
import SelectTeam from "../Universal/SelectTeam";

import './Home.css'


import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Home(){

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/teamcreate');
    };

    return(
        <div>
            <Nav/>
            <Top/>
            <div className="gridT">
                <div className="teamChange">
                    <SelectTeam/>
                </div>
                <div className="square">
                    <h1>Criar um time</h1>
                    <div className="squareIcon">
                        <button onClick={handleNavigate}><i class="bi bi-plus-square"></i></button>
                    </div>
              </div>                
            </div>
        </div>
    )
}
export default Home