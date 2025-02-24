import Nav from "../Universal/Nav"
import Top from "../Universal/Top"
import './Players.css'
import { useNavigate } from "react-router-dom"


function Players(){

    const navigate = useNavigate()

    return (
        <div>
            <Nav />
            <Top />
            <div className="allPlayers">
                <div className="leftOne">
                    <div className="seta b ">
                        <button onClick={() => navigate('/')}>
                            Voltar
                        </button>
                    </div>
                    <div className="pesquisa">
                        <h1>pesquisa</h1>
                    </div>
                    <div className="players">
                        <h1>players</h1>
                    </div>
                </div>
                <div className="rightOne">
                    <div className="detalhes">
                        <h1>detalhes</h1>
                    </div>
                    <div className="boxPlayer">
                        <h1>BoxPlayers</h1>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Players