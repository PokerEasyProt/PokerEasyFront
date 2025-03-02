import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Top from "../Universal/Top";
import Nav from '../Universal/Nav';
import '../Manager/Home.css';
import SelectTeam from '../Universal/SelectTeam';
import { UserContext } from "../../context/userContext";

function Home() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [pendingTeam, setPendingTeam] = useState(false);
    const [platformAccounts, setPlatformAccounts] = useState({});
    const [playerTeams, setPlayerTeams] = useState([]); // Estado para os times do jogador

    // Verifica se o jogador tem um convite pendente e busca seus times
    useEffect(() => {
        if (user?.id && user.cargo === "player") {
            checkPendingInvitation();
            fetchPlayerTeams(); // Busca os times do jogador
        }
    }, [user?.id, user?.cargo]);

    const checkPendingInvitation = async () => {
        try {
            const response = await axios.get(`/player/${user.id}/pending`);
            if (response.data.hasPendingTeam) {
                setPendingTeam(response.data.team);
            }
        } catch (error) {
            console.error("Erro ao buscar convite do time:", error);
        }
    };

    const fetchPlayerTeams = async () => {
        try {
            const response = await axios.get(`/player/${user.id}/teams`);
            if (response.data.teams && response.data.teams.length > 0) {
                setPlayerTeams(response.data.teams); // Armazena os times do jogador
            }
        } catch (error) {
            console.error("Erro ao buscar times do jogador:", error);
        }
    };

    const handleAcceptTeam = async () => {
        // Verifica se todos os campos foram preenchidos
        const isFormValid = platformAccounts.nick?.trim() && 
            pendingTeam.accounts.every(account => platformAccounts[account.platform]?.trim());

        if (!isFormValid) {
            toast.error("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            await axios.post(`/team/${pendingTeam._id}/accept`, {
                playerId: user.id,
                name: user.name,
                email: user.email,
                nick: platformAccounts.nick,
                cpf: user.cpf,
                accounts: Object.entries(platformAccounts)
                    .filter(([key]) => key !== "nick")
                    .map(([value , platform]) => ({
                        platform,
                        value
                        
                    }))
            });

            toast.success("Você entrou no time!");
            window.location.reload(); // Recarrega a página para atualizar os dados
        } catch (error) {
            console.error("Erro ao aceitar convite:", error);
            toast.error("Erro ao entrar no time.");
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
            <div>
                {playerTeams.length > 0 ? ( // Se o jogador estiver em algum time
                    <div>
                        <h2>Você está nos seguintes times:</h2>
                        <ul>
                            {playerTeams.map((team, index) => (
                                <li key={index} className='teamsHomeP'>
                                    <strong>{team.name}</strong> - {team.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : pendingTeam ? ( // Se houver convite pendente
                    <div>
                        <h2>Você foi convidado para o time {pendingTeam.name}!</h2>
                        <p>Preencha os dados para confirmar sua entrada:</p>

                        {/* Campo para o nick */}
                        <div>
                            <label>Nick no time: </label>
                            <input
                                type="text"
                                placeholder="Seu nick"
                                value={platformAccounts.nick || ""}
                                onChange={(e) => setPlatformAccounts({
                                    ...platformAccounts,
                                    nick: e.target.value
                                })}
                            />
                        </div>

                        {/* Campos para as contas vinculadas */}
                        {pendingTeam.accounts.map((account, index) => (
                            <div key={index}>
                                <label>{account.key}: </label>
                                <input
                                    type="text"
                                    placeholder={`Insira sua ${account.platform}`}
                                    value={platformAccounts[account.platform] || ""}
                                    onChange={(e) => setPlatformAccounts({
                                        ...platformAccounts,
                                        [account.platform]: e.target.value
                                    })}
                                />
                            </div>
                        ))}

                        <button onClick={handleAcceptTeam}>Aceitar Convite</button>
                    </div>
                ) : ( // Se não houver times nem convites pendentes
                    <div>
                        <h2>Bem-vindo, jogador!</h2>
                        <p>Quando um time te convidar, te avisaremos!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;