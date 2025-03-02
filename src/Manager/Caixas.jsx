import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Universal/Nav';
import Top from '../Universal/Top';
import './Caixas.css';

function Caixas() {
    const [cashboxes, setCashboxes] = useState([]);
    const [newCashboxName, setNewCashboxName] = useState('');
    const [teamId, setTeamId] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            const profileRes = await axios.get('/profile', { withCredentials: true });
            const teamRes = await axios.get(`/team/owner/${profileRes.data.id}`);
            setTeamId(teamRes.data.team._id);
            setCashboxes(teamRes.data.team.cashboxes);
        };
        fetchTeam();
    }, []);

    const handleCreateCashbox = async (e) => {
        e.preventDefault();
        const res = await axios.post(`/team/${teamId}/cashbox`, { name: newCashboxName });
        setCashboxes(res.data);
        setNewCashboxName('');
    };

    return (
        <div>
            <Nav />
            <Top />
            <div className="caixas-container">
                <h1>Caixas</h1>
                {cashboxes.length === 0 ? (
                    <p>Nenhuma caixa encontrada. Crie uma!</p>
                ) : (
                    cashboxes.map((cashbox) => (
                        <div key={cashbox._id}>
                            <h2>{cashbox.name} - Saldo: R${cashbox.balance}</h2>
                            <ul>
                                {cashbox.history.map((op) => (
                                    <li key={op._id}>
                                        {op.date} - {op.operationType} - {op.value} {op.currency} - Executado por {op.executedBy}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
                <form onSubmit={handleCreateCashbox}>
                    <input
                        type="text"
                        placeholder="Nome da nova caixa"
                        value={newCashboxName}
                        onChange={(e) => setNewCashboxName(e.target.value)}
                        required
                    />
                    <button type="submit">Criar Caixa</button>
                </form>
            </div>
        </div>
    );
}

export default Caixas;
