import './Login.css'
import React, { useState } from 'react';
import TopLog from '../../Universal/TopLog'
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




function Login(){

    const navigate = useNavigate()
    


    const [data, setData] = useState(
        {
          email: '',
          password: ''
        }
      )
    
    const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

        try {
            const { data } = await axios.post('/login', { email, password });
    
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                // 🚀 Chama o /profile depois do login
                axios.get('/profile', { withCredentials: true })
                    .then(response => {
                        console.log('Perfil carregado:', response.data);
                        setUser(response.data); // Atualiza o UserContext
                        navigate('/'); // Redireciona após atualizar o perfil
                    })
                    .catch(error => {
                        console.error('Erro ao buscar perfil:', error);
                    });
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };


    return(
        <div>
            <TopLog/>
            <form onSubmit={LoginUser} className="Login b">
                <h1>Faça Login agora!</h1>
                <div className="LoginInputs">
                    <p>Email</p>
                    <input type="text" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    <p>Senha</p>
                    <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                <button type='submit'>Login</button>
                </div>
                <p>Não tem uma conta ainda? <a href="/cadastro">Cadatre-se!</a></p>
            </form>
        </div>
    )
}
export default Login
