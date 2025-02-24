import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Top from "../Universal/Top";
import Nav from '../Universal/Nav';
import './Home.css';
import SelectTeam from '../Universal/SelectTeam';
import { UserContext } from "../../context/userContext";
import HomeM from './HomeM'
import HomeP from '../Player/HomeP'





function Home(){

    const { user } = useContext(UserContext);
    return(
   <div>
     {(user?.id && user.cargo === "manager") && <HomeM/>}
    {(user?.id && user.cargo === "player") && <HomeP/>}

   </div>
   )
}
export default Home



// function Home(){
//     const navigate = useNavigate();
//     const { user } = useContext(UserContext);

//     const [team, setTeam] = useState(null);
//     const [pendingTeam, setPendingTeam] = useState(null);
//     const [platformAccounts, setPlatformAccounts] = useState({});

//     // Verifica se o usuário é manager e tem um time
//     useEffect(() => {
//         if (user?.id && user.cargo === "manager") {
//             checkIfOwner();
//         }
//     }, [user?.id, user?.cargo]); 

//     const checkIfOwner = async () => {
//         try {
//             const response = await axios.get(`/team/owner/${user.id}`);
//             setTeam(response.data.hasTeam);
//         } catch (error) {
//             console.error("Erro ao verificar owner:", error);
//         }
//     };

//     // Verifica se o jogador tem um convite pendente
//     useEffect(() => {
//         if (user?.id && user.cargo === "player") {
//             checkPendingInvitation();
//         }
//     }, [user?.id, user?.cargo]);

//     const checkPendingInvitation = async () => {
//         try {
//             const response = await axios.get(`/player/${user.id}/pending`);
//             if (response.data.hasPendingTeam) {
//                 setPendingTeam(response.data.team);
//             }
//         } catch (error) {
//             console.error("Erro ao buscar convite do time:", error);
//         }
//     };

//     const handleAcceptTeam = async () => {
//         try {
//             await axios.post(`/team/${pendingTeam._id}/accept`, {
//                 playerId: user.id,
//                 name: user.name,
//                 email: user.email,
//                 nick: platformAccounts.nick,
//                 accounts: Object.entries(platformAccounts).map(([platform, value]) => ({
//                     platform,
//                     value
//                 }))
//             });

//             toast.success("Você entrou no time!");
//             navigate("/player");
//         } catch (error) {
//             console.error("Erro ao aceitar convite:", error);
//             toast.error("Erro ao entrar no time.");
//         }
//     };

//     if (!user) {
//         return <p>Carregando... Tente recarregar a página</p>;
//     }

//     return (
//         <div>
//             <Nav />
//             <Top />
//             <h1 className='hello'>Olá, {user.name}</h1>

//             {user.cargo === "manager" ? (
//                 <div className="gridT">
//                     {team === null ? (
//                         <p>Verificando time...</p>
//                     ) : team ? (
//                         <SelectTeam />
//                     ) : (
//                         <div className="square b">
//                             <h1>Criar um time</h1>
                            // <div className="squareIcon">
                            //     <button onClick={() => navigate('/teamcreate')}>
                            //         <i className="bi bi-plus-square"></i>
                            //     </button>
                            // </div>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div>
//                     {pendingTeam ? (
//                         <div>
//                             <h2>Você foi convidado para o time {pendingTeam.name}!</h2>
//                             <p>Preencha os dados para confirmar sua entrada:</p>

//                             {pendingTeam.accounts.map((account, index) => (
//                                 <div key={index}>
//                                     <label>{account.platform}:</label>
//                                     <input
//                                         type="text"
//                                         placeholder={account.platform}
//                                         value={platformAccounts[account.platform] || ""}
//                                         onChange={(e) => setPlatformAccounts({
//                                             ...platformAccounts,
//                                             [account.platform]: e.target.value
//                                         })}
//                                     />
//                                 </div>
//                             ))}

//                             <button onClick={handleAcceptTeam}>Aceitar Convite</button>
//                         </div>
//                     ) : (
//                         <div>
//                             <h2>Bem-vindo, jogador!</h2>
//                             <p>Quando um time te convidar, te avisaremos!</p>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Home;
