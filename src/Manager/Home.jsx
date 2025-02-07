import { useNavigate } from 'react-router-dom';
import { useState, useContext} from 'react';
import Top from "../Universal/Top";
import Nav from '../Universal/Nav';
import './Home.css';
import SelectTeam from '../Universal/SelectTeam';

import { UserContext } from "../../context/userContext"

function Home(){
    const navigate = useNavigate();

    // Pra usar esse "team", vamos enviar un get pra api para tentar encontrar algum time cadastrado na conta do manager q ta logado, se tiver 1 ou mais ele seta pra True, se não ele seta para False

    const [team, setTeam] = useState(false);

    const handleNavigate = () => {
        navigate('/teamcreate');
    };
    


    const {user} = useContext(UserContext)
    return(
        <div>
            <Nav/>
            <Top/>
            {!!user && (<h1 className='hello'>Olá {user.name}</h1>)}
            <div className="gridT">
                {team ? (
                    <div><SelectTeam/>
                    
                    </div>
                    
                ) : (
                    <div className="square b">
                        <h1>Criar um time</h1>
                        <div className="squareIcon">
                            <button onClick={handleNavigate}><i className="bi bi-plus-square"></i></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home;