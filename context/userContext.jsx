import axios from "axios";
import { createContext, useState, useEffect} from "react";


export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    useEffect(()=> {
        if(!user){
            
            axios.get('/profile').then(({data}) => {
                console.log("baby im wothing")
                setUser(data)
            })
        }
    }, [])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

