import Top from "../Universal/Top";
import './Teamcreate.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Teamcreate() {
    const navigate = useNavigate();

    // Estado para gerenciar os campos adicionados
    const [accounts, setAccounts] = useState([]);

    // Função para adicionar um novo campo
    const addAccountField = () => {
        setAccounts([...accounts, { name: "", platform: "" }]);
    };

    // Função para manipular alterações nos campos
    const handleFieldChange = (index, field, value) => {
        const updatedAccounts = [...accounts];
        updatedAccounts[index][field] = value;
        setAccounts(updatedAccounts);
    };

    // Função para remover um campo
    const removeAccountField = (index) => {
        const updatedAccounts = accounts.filter((_, i) => i !== index);
        setAccounts(updatedAccounts);
    };

    const click = () => {
        navigate('/teamview');
    };

    return (
        <div>
            <Top />
            <div className="Teamcreate">
                <header>
                    <br />
                    <h1>Crie seu time!</h1>
                </header>
                <section className="TCform">
                    <div className="TCnames">
                        <h2>Informações gerais</h2>

                        <p>Nome do time</p>
                        <input type="text" />

                        <p>Descrição</p>
                        <input type="text" />

                        <p>ID Server Discord</p>
                        <input type="text" />

                        <p>Sigla</p>
                        <input type="text" />

                        <p>Icone do Time</p>
                        <input type="file" />
                    </div>
                    <div className="TCrules">
                        <h2>Tipos de conta/Plataforma</h2>
                        <button id="BTadd" onClick={addAccountField}>
                        <p>Adicionar conta</p><i className="bi bi-plus-square"></i>
                        </button>
                        {/* Renderizar dinamicamente os campos adicionados */}
                        {accounts.map((account, index) => (
                            <div key={index} className="TCaccount">
                                <input
                                    type="text"
                                    placeholder="Nome da conta"
                                    value={account.name}
                                    onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                                />
                                <select
                                    value={account.platform}
                                    onChange={(e) => handleFieldChange(index, "platform", e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma plataforma</option>
                                    <option value="Nick">Nick</option>
                                    <option value="Email">Email</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Telefone">Telefone</option>
                                </select>
                                {/* Botão para remover o campo */}
                                <button onClick={() => removeAccountField(index)} className="remove-btn">
                                <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="TCbutton">
                        <button onClick={click} type="submit">Criar time</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Teamcreate;
