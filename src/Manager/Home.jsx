import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Top from "../Universal/Top";
import Nav from '../Universal/Nav';
import './Home.css';
import SelectTeam from '../Universal/SelectTeam';
import { UserContext } from "../../context/userContext";

function Home(){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [team, setTeam] = useState(false); // Substituir por um fetch real depois

    const handleNavigate = () => {
        navigate('/teamcreate');
    };

    


    if (!user) {
        return <p>Carregando... Tente recarregar a pagina</p>; // Evita erro caso o user ainda não esteja carregado
    }

    return (
        <div>
            <Nav />
            <Top />
            <h1 className='hello'>Olá, {user.name}</h1>

            {user.cargo === "manager" ? (
                <div className="gridT">
                    {team ? (
                        <SelectTeam />
                    ) : (
                        <div className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                                <button onClick={handleNavigate}><i className="bi bi-plus-square"></i></button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Bem-vindo, jogador!</h2>
                    <p>Aqui você pode ver suas estatísticas, partidas e muito mais.</p>
                </div>
            )}
        </div>
    );
}

export default Home;
