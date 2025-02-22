import axios from "axios";
import { createContext, useState, useEffect} from "react";


export const UserContext = createContext({})


export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        axios.get('/profile')
          .then(({ data }) => {
            setUser(data); // Atualiza o estado mesmo se já houver um usuário
          })
          .catch((err) => {
            console.error('Erro ao carregar perfil:', err);
          });
      }, []); // Execute apenas uma vez ao montar o componente
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

