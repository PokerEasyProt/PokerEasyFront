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

    const [team, setTeam] = useState(null);
    const [pendingTeam, setPendingTeam] = useState(null);
    const [platformAccounts, setPlatformAccounts] = useState({});

    // Verifica se o usuário é manager e tem um time
    useEffect(() => {
        if (user?.id && user.cargo === "manager") {
            checkIfOwner();
        }
        else{navigate('/HomeP')}
    }, [user?.id, user?.cargo]); 

    const checkIfOwner = async () => {
        try {
            const response = await axios.get(`/team/owner/${user.id}`);
            setTeam(response.data.hasTeam);
        } catch (error) {
            console.error("Erro ao verificar owner:", error);
        }
    };


    if (!user) {
        return <p>Carregando... Tente recarregar a página</p>;
    }

    return (
        <div>
            <Nav />
            <Top />
            <h1 className='hello'>Olá, {user.name}</h1>
            <div className="gridT">
                    {team === null ? (
                        <p>Verificando time...</p>
                    ) : team ? (
                        <SelectTeam />
                    ) : (
                        <div className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                                <button onClick={() => navigate('/teamcreate')}>
                                    <i className="bi bi-plus-square"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default Home;
