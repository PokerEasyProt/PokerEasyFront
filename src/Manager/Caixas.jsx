import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Universal/Nav';
import Top from '../Universal/Top';
import './Caixas.css';
import { useNavigate } from 'react-router-dom';

function Caixas() {
    const navigate = useNavigate();
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
            <div className="allCaixas">
            <div className="seta b">
                        <button onClick={() => navigate('/')}>Voltar</button>
                    </div>
                    <h1>Caixas</h1>
            <div className="caixas-container">
                <div className="caixasLeft">
                {cashboxes.length === 0 ? (
                    <p>Nenhuma caixa encontrada. Crie uma!</p>
                ) : (
                    cashboxes.map((cashbox) => (
                        <div key={cashbox._id}>
                            
                            <div className='h1Caixas'>
                            <h2>{cashbox.name} - Saldo: R${cashbox.balance}</h2>
                            </div>
                            <div className="historicoCaixas">
                            <ul>
                                <p>Histórico</p>
                                {cashbox.history.map((op) => (
                                    <li key={op._id}>
                                        {op.date} - {op.operationType} - {op.value} {op.currency} - Executado por {op.executedBy}
                                    </li>
                                ))}
                            </ul>
                            </div>

                        </div>
                    ))
                )}
                </div>
                <div className="caixasRight">
                <form onSubmit={handleCreateCashbox}>
                    <div className="caixasNew">
                    <h1>Criar Caixa</h1>
                    <p>Ao criar uma caixa, ela não podera ser excluida e seu histórico permanescerá sempre visivel</p>
                    <input
                        type="text"
                        placeholder="Nome da nova caixa"
                        value={newCashboxName}
                        onChange={(e) => setNewCashboxName(e.target.value)}
                        required
                    />
                    <button type="submit">Criar Caixa</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Caixas;
