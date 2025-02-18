import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import TopLoggout from '../../Universal/TopLog';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Cadastro() {


  const formatCPF = (value) => {
    value = value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.slice(0, 11); // Limita a 11 caracteres
    
    if (value.length > 9) {
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
    } else if (value.length > 6) {
      return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      return `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    
    return value;
  };
  
  const handleCPFChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    setData({ ...data, cpf: rawValue });
  };

  
  const navigate = useNavigate();

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica tamanho e sequências repetidas

    const calcDigit = (slice) => {
      let sum = slice.split('').reduce((acc, num, index) => acc + num * (slice.length + 1 - index), 0);
      let digit = (sum * 10) % 11;
      return digit === 10 ? 0 : digit;
    };

    return calcDigit(cpf.slice(0, 9)) == cpf[9] && calcDigit(cpf.slice(0, 10)) == cpf[10];
  };

  const [data, setData] = useState({
    name: '',
    email: '',
    nick: '',
    cpf: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
  
    if (!validateCPF(data.cpf)) {
      toast.error('CPF inválido!');
      return;
    }
  
    const { name, email, nick, cpf, password } = data;
    const cargo = 'player';
  
    try {
      const response = await axios.post('/register', { 
        name, 
        email, 
        nick: nick || 'noNick',
        cpf: cpf.replace(/\D/g, ''), // Remove pontos e traço antes de enviar
        password, 
        cargo 
      });
  
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          name: '',
          email: '',
          nick: '',
          cpf: '',
          password: ''
        });
        toast.success('Conta registrada com sucesso!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error);
      toast.error('Erro ao registrar. Tente novamente.');
    }
  };
  

  return (
    <div>
      <TopLoggout />
      <form onSubmit={registerUser} className="cadastroForm b">
        <h1>Cadastre-se!</h1>

        <div className="Cadinputs">
          <p>Nome Completo <strong>*</strong></p>
          <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

          <p>Email <strong>*</strong></p>
          <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

          <p>Nick</p>
          <input type="text" value={data.nick} onChange={(e) => setData({ ...data, nick: e.target.value })} />

          <p>CPF <strong>*</strong></p>
          <input  type="text"  name="cpf"  id="cpf"  value={formatCPF(data.cpf)} onChange={handleCPFChange}/>

          <p>Senha <strong>*</strong></p>
          <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        </div>
        <button type="submit">Cadastrar-se</button>
        <p>Já possui conta? <a href="/login">Faça Login</a></p>
      </form>
    </div>
  );
}

export default Cadastro;
