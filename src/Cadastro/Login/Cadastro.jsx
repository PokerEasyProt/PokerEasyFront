import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import TopLoggout from '../../Universal/TopLog';
import axios from 'axios'
import {toast} from 'react-hot-toast';


function Cadastro() {

  const handleButtonClick = (botao) => {
    setBotaoSelecionado(botao);
  };

  const navigate = useNavigate();

  
  
  const [data, setData] = useState(
    {
      name: '',
      email: '',
      nick: '',
      cpf: '',
      discordId: '',
      password: ''
    }
  )



  const registerUser = async (e) => {
    e.preventDefault();
    const {name, email, nick, cpf, discordId, password} = data
    try {
      const {data} = await axios.post('/register', {
        name, email, nick, cpf, discordId, password
      })
      if(data.error){
        toast.error(data.error) 
      } else {
        setData({})
        toast.success('Conta registrada com sucesso!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <div>
      <TopLoggout />
      <form onSubmit={registerUser} className={'cadastroForm'}>
        <h1>Cadastre-se!</h1>

       

        <div className="Cadinputs">
          <p>Nome Completo</p>
          <input type="text" name="nomeCompleto" id="nomeCompleto" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>

          <p>Email</p>
          <input type="email" name="email" id="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />

          <p>Nick</p>
          <input type="text" name="nick" id="nick" value={data.nick} onChange={(e) => setData({...data, nick: e.target.value})}/>

          <p>CPF</p>
          <input type="text" name="cpf" id="cpf" value={data.cpf} onChange={(e) => setData({...data, cpf: e.target.value})}/>

          <p>Discord ID</p>
          <input type="text" name="DsID" id="DsID" value={data.discordId} onChange={(e) => setData({...data, discordId: e.target.value})}/>

          <p>Senha</p>
          <input type="password" name="senha" id="senha" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>


        </div>
        <button type='submit'>Cadastrar-se</button>
      </form>
    </div>
  );
}

export default Cadastro;