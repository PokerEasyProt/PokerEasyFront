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

    // Estado para armazenar os dados do time
    const [data, setData] = useState({
        name: "",
        description: "",
        discordId: "",
        sigla: "",
        icon: "",
        accounts: []
    });

    // Adicionar nova conta vinculada
    const addAccountField = () => {
        setData({ ...data, accounts: [...data.accounts, { name: "", platform: "" }] });
    };

    // Atualizar dados das contas vinculadas
    const handleFieldChange = (index, field, value) => {
        const updatedAccounts = [...data.accounts];
        updatedAccounts[index][field] = value;
        setData({ ...data, accounts: updatedAccounts });
    };

    // Remover uma conta vinculada
    const removeAccountField = (index) => {
        setData({ ...data, accounts: data.accounts.filter((_, i) => i !== index) });
    };

    // Criar time (Função corrigida)
    const createTeam = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("discordId", data.discordId);
            formData.append("sigla", data.sigla);
            formData.append("icon", data.icon);
            formData.append("owner", user.id);
            formData.append("accounts", JSON.stringify(data.accounts));
    
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
    
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



// const createTeam = async (e) => {
    //     e.preventDefault();
    
    //     if (!user) {
    //         toast.error("Usuário não autenticado.");
    //         return;
    //     }
    
    //     const transformedData = {
    //         name: data.name.toLowerCase(),
    //         description: data.description,
    //         discordId: data.discordId,
    //         sigla: data.sigla.toUpperCase(),
    //         icon: data.icon,
    //         accounts: data.accounts,
    //         owner: user._id
    //     };
    
    //     try {
    //         const token = localStorage.getItem("token"); // Ou onde estiver armazenado
    
    //         const response = await axios.post("/create", transformedData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         );
    
    //         if (response.data.error) {
    //             toast.error(response.data.error);
    //         } else {
    //             setData({
    //                 name: "",
    //                 description: "",
    //                 discordId: "",
    //                 sigla: "",
    //                 icon: null,
    //                 accounts: []
    //             });
    //             toast.success("Time criado com sucesso!");
    //             navigate("/teamview");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao criar o time:", error);
    //         toast.error("Erro ao criar o time.");
    //     }
    // };