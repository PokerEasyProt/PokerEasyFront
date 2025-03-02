import { useState, useEffect } from "react";
import axios from "axios";
import "./Operation.css";
import Nav from "../Universal/Nav";
import Top from "../Universal/Top";

function Operation() {
    const [players, setPlayers] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [teamId, setTeamId] = useState("");
    const [operation, setOperation] = useState({
        type: "",
        player: "",
        account: "",
        box: "",
        amount: "",
        currency: ""
    });

    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                const response = await axios.get(`/team/${teamId}/cashboxes`, { withCredentials: true });
                console.log('Caixas recebidas:', response.data); // Verifica o retorno
                setBoxes(response.data);
            } catch (error) {
                console.error('Erro ao buscar caixas:', error);
            }
        };
    
        if (teamId) fetchBoxes();
    }, [teamId]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const profileRes = await axios.get("/profile", { withCredentials: true });
                const userId = profileRes.data.id;

                const teamRes = await axios.get(`/team/owner/${userId}`, { withCredentials: true });

                if (teamRes.data.hasTeam) {
                    setTeamId(teamRes.data.team._id);
                    setPlayers(teamRes.data.team.players);
                    setBoxes(teamRes.data.team.boxes); // Supondo que as caixas vêm junto do time
                } else {
                    console.log("Esse manager não é dono de nenhum time.");
                }
            } catch (error) {
                console.error("Erro ao buscar time do manager:", error);
            }
        };

        fetchTeam();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOperation({ ...operation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const operationData = {
            operationType: operation.type,
            playerId: operation.player, // Alterado de 'player' para 'playerId'
            account: operation.account,
            box: operation.box,
            value: Number(operation.amount), // Aqui ajusta de 'amount' para 'value'
            currency: operation.currency,
            executedBy: (await axios.get("/profile", { withCredentials: true })).data.id, // Quem tá executando
        };
    
        console.log("operationData:", operationData); // Verifica se tá tudo certo
        try {
            const response = await axios.post(`/team/${teamId}/cashbox/${operation.box}/operation`, operationData, {
                withCredentials: true
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Erro ao registrar operação:", error);
        }
    };
    

    return (
        <div>
            <Nav />
            <Top />
            <form onSubmit={handleSubmit}>
                <label>Tipo de Operação:</label>
                <select name="type" value={operation.type} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    <option value="Sangria">Sangria</option>
                    <option value="Saque">Saque</option>
                    <option value="Reload">Reload</option>
                </select>

                <label>Jogador:</label>
                <select name="player" value={operation.player} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    {players.map((player) => (
                        <option key={player._id} value={player._id}>
                            {player.nick}
                        </option>
                    ))}
                </select>

                <label>Conta:</label>
                <select name="account" value={operation.account} onChange={handleChange} required>
                 <option value="">Selecione...</option>
                {players.length > 0 && operation.player
                ? players.find(p => p._id === operation.player)?.accounts?.map((acc) => (
                 <option key={acc.platform} value={acc.platform}>
                {acc.platform}
                 </option>
                 ))
                : null}
        </select>

<label>Caixa:</label>
<select name="box" value={operation.box} onChange={handleChange} required>
    <option value="">Selecione...</option>
    {boxes && boxes.length > 0
        ? boxes.map((box) => (
            <option key={box._id} value={box._id}>
                {box.name}
            </option>
          ))
        : <option disabled>Nenhuma caixa encontrada</option>}
</select>
                <label>Valor:</label>
                <input
                    type="number"
                    name="amount"
                    value={operation.amount}
                    onChange={handleChange}
                    required
                />

                <label>Moeda:</label>
                <select name="currency" value={operation.currency} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    <option value="BRL">Real (BRL)</option>
                    <option value="USD">Dólar (USD)</option>
                </select>

                <button type="submit">Realizar Operação</button>
            </form>
        </div>
    );
}

export default Operation;
