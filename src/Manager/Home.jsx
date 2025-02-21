import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Top from "../Universal/Top";
import Nav from '../Universal/Nav';
import './Home.css';
import SelectTeam from '../Universal/SelectTeam';
import { UserContext } from "../../context/userContext";

function Home(){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [team, setTeam] = useState(null); // null para indicar carregamento inicial

    useEffect(() => {
        if (user) {
            checkIfOwner();
        }
    }, [user]); // Chama a função quando `user` for carregado

    const checkIfOwner = async () => {
        try {
            const response = await axios.get(`/team/owner/${user.id}`);
            if (response.data.hasTeam) {
                setTeam(true);
            } else {
                setTeam(false);
            }
        } catch (error) {
            console.error("Erro ao verificar owner:", error);
        }
    };

    const handleNavigate = () => {
        navigate('/teamcreate');
    };

    if (!user) {
        return <p>Carregando... Tente recarregar a página</p>; // Evita erro caso `user` ainda não tenha carregado
    }

    return (
        <div>
            <Nav />
            <Top />
            <h1 className='hello'>Olá, {user.name}</h1>

            {user.cargo === "manager" ? (
                <div className="gridT">
                    {team === null ? (
                        <p>Verificando time...</p> // Exibe um aviso enquanto carrega
                    ) : team ? (
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
