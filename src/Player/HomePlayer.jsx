import Top from "../Universal/Top"
import Nav from '../Universal/Nav'
import './HomePlayer.css'
import { useState } from "react";


function HomePlayer(){

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return(
        <div>
            <Nav/>
            <Top/>
            <div className="gridT">
                
                <div className="square">
                    <h1>Encontre um time</h1>
                    <div className="squareIcon">
                        <button onClick={togglePopup}><i class="bi bi-plus-square"></i></button>
                    </div>
              </div>                
            </div>
            {showPopup && (
                <div className="overlay">
                    <div className="popup">
                        <h2>Encontre seu um Time</h2>
                        <input type="text" placeholder="Escreva a ID do Discord do seu time" />
                        <button>Enviar</button>
                        <button onClick={togglePopup}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default HomePlayer