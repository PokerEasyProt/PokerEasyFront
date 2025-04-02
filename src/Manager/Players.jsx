import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Universal/Nav";
import Top from "../Universal/Top";
import "./Players.css";
import icon from '../imgs/adan.png';

function Players() {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]); // Jogadores filtrados pela pesquisa
    const [teamId, setTeamId] = useState(""); // Pega o ID do time do manager depois
    const [selectedPlayer, setSelectedPlayer] = useState(null); // Guarda o player selecionado
    const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`/team/players/${teamId}`, { withCredentials: true });
                setPlayers(response.data);
                setFilteredPlayers(response.data); // Inicializa a lista filtrada
            } catch (error) {
                console.error("Erro ao buscar jogadores:", error);
            }
        };

        if (teamId) fetchPlayers();
    }, [teamId]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const profileRes = await axios.get("/profile", { withCredentials: true });
                const userId = profileRes.data.id;

                const teamRes = await axios.get(`/team/owner/${userId}`, { withCredentials: true });

                if (teamRes.data.hasTeam) {
                    setTeamId(teamRes.data.team._id);
                } else {
                    console.log("Esse manager não é dono de nenhum time.");
                }
            } catch (error) {
                console.error("Erro ao buscar time do manager:", error);
            }
        };

        fetchTeam();
    }, []);

    const handleSelectPlayer = (player) => {
        setSelectedPlayer(player); // Define o player clicado
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = players.filter(player =>
            player.name.toLowerCase().includes(term) ||
            player.nick.toLowerCase().includes(term) ||
            player.email.toLowerCase().includes(term) ||
            player.cpf.includes(term)
        );

        setFilteredPlayers(filtered);
    };

    return (
        <div>
            <Nav />
            <Top />
            <div className="allPlayers">
                <div className="leftOne">
                    <div className="seta b">
                        <button onClick={() => navigate('/')}>Voltar</button>
                    </div>
                    <div className="pesquisa">
                        <input
                            type="text"
                            placeholder="Pesquisar jogador..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="players">
                        {filteredPlayers.length > 0 ? (
                            filteredPlayers.map((player) => (
                                <div
                                    key={player._id}
                                    className={`player-card ${selectedPlayer?._id === player._id ? 'selected' : ''}`}
                                    onClick={() => handleSelectPlayer(player)}
                                >
                                    <img src={icon} alt="" />
                                    <div className="infosPlayers">
                                        <h1>{player.name}</h1>
                                        <p>{player.nick}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum jogador encontrado.</p>
                        )}
                    </div>
                </div>
                <div className="rightOne">
                    <div className="detalhes">
                        <h1>Detalhes do jogador</h1>
                    </div>
                    <div className="boxPlayer">
                        
                        {selectedPlayer ? (
                            <>
                                <p>Nick: {selectedPlayer.name}</p>
                                <p>Nick: {selectedPlayer.nick}</p>
                                <p>CPF: {selectedPlayer.cpf}</p>
                                <p>Email: {selectedPlayer.email}</p>
                            </>
                        ) : (
                            <h1>Selecione um jogador</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Players;
