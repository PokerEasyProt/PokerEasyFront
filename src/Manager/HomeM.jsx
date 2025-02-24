import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Top from "../Universal/Top";
import Nav from '../Universal/Nav';
import './Home.css';
import SelectTeam from '../Universal/SelectTeam';
import { UserContext } from "../../context/userContext";
import { TypeAnimation } from 'react-type-animation';

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
        <div className='allHomeM'>
            <Nav />
            <Top />
            <TypeAnimation
                sequence={[`Olá, ${user.name}!`, 1000]}
                wrapper="h1"
                cursor={true}
                repeat={0}
                className='hello demo'
            />
            <div className="gridT">
                    {team === null ? (
                        <p>Verificando time...</p>
                    ) : team ? (
                        <div>
                        <SelectTeam />
                        <div className='squareGrid'>
                        
                        <button  onClick={() => navigate('/players')} className="square b">
                            <h1>Painel de players</h1>
                            <div className="squareIcon">
                            </div>
                        </button>
                        <button className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                            </div>
                        </button>
                        <button className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                            </div>
                        </button>
                        </div>
                        <div className='squareGrid'>
                        
                        <button className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                            </div>
                        </button>
                        <button className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                            </div>
                        </button>
                        <button className="square b">
                            <h1>Criar um time</h1>
                            <div className="squareIcon">
                            </div>
                        </button>
                        </div>
                        </div>
                        
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
