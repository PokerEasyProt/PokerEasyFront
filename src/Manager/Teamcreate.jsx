import Top from "../Universal/Top";
import "./Teamcreate.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";

function Teamcreate() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [data, setData] = useState({
        name: "",
        description: "",
        discordId: "",
        sigla: "",
        icon: "",
        accounts: [] // Cada item deve ter { platform: "", key: "" }
    });

    const addAccountField = () => {
        setData({ ...data, accounts: [...data.accounts, { platform: "", key: "" }] });
    };

    const handleFieldChange = (index, field, value) => {
        const updatedAccounts = [...data.accounts];
        updatedAccounts[index][field] = value;
        setData({ ...data, accounts: updatedAccounts });
    };

    const removeAccountField = (index) => {
        setData({ ...data, accounts: data.accounts.filter((_, i) => i !== index) });
    };

    const createTeam = async (e) => {
        e.preventDefault();

        if (!data.name || !data.sigla || !user.id) {
            toast.error("Nome, sigla e dono do time são obrigatórios.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("discordId", data.discordId);
            formData.append("sigla", data.sigla);
            formData.append("icon", data.icon);
            formData.append("owner", user.id);
            formData.append("accounts", JSON.stringify(data.accounts));

            const response = await axios.post('/team', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Time criado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar o time.");
        }
    };

    return (
        <div>
            <Top />
            <form onSubmit={createTeam} className="Teamcreate b">
                <header>
                    <h1>Crie seu time!</h1>
                </header>
                <section className="TCform">
                    <div className="TCnames">
                        <h2>Informações gerais</h2>

                        <p>Nome do time</p>
                        <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

                        <p>Descrição</p>
                        <input type="text" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />

                        <p>ID Server Discord</p>
                        <input type="text" value={data.discordId} onChange={(e) => setData({ ...data, discordId: e.target.value })} />

                        <p>Sigla</p>
                        <input type="text" value={data.sigla} onChange={(e) => setData({ ...data, sigla: e.target.value })} />

                        <p>Ícone do Time</p>
                        <input type="text" value={data.icon} onChange={(e) => setData({ ...data, icon: e.target.value })} />
                    </div>

                    <div className="TCrules">
                        <h2>Tipos de conta/Plataforma</h2>
                        <button id="BTadd" type="button" onClick={addAccountField}>
                            <p>Adicionar conta</p>
                            <i className="bi bi-plus-square"></i>
                        </button>

                        {data.accounts.map((account, index) => (
                            <div key={index} className="TCaccount">
                                <input
                                    type="text"
                                    placeholder="Chave da conta"
                                    value={account.key}
                                    onChange={(e) => handleFieldChange(index, "key", e.target.value)}
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
                                <button type="button" onClick={() => removeAccountField(index)} className="remove-btn">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="TCbutton">
                        <button type="submit">Criar time</button>
                    </div>
                </section>
            </form>
        </div>
    );
}

export default Teamcreate;