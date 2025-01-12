import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import TopLoggout from '../../Universal/TopLog';

function Cadastro() {
  const [botaoSelecionado, setBotaoSelecionado] = useState('botao1'); // Inicializa com o botão "Player" selecionado

  const handleButtonClick = (botao) => {
    setBotaoSelecionado(botao);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Home'); 
  };

  return (
    <div>
      <TopLoggout />
      <div className={`cadastroForm ${botaoSelecionado === 'botao1' ? 'player' : 'manager'}`}>
        <h1>Cadastre-se!</h1>

        <div className="CadButtons">
          <button autoFocus onClick={() => handleButtonClick('botao1')}>Player</button>
          <button onClick={() => handleButtonClick('botao2')}>Manager</button>
        </div>

        <div className="Cadinputs">
          <p>Nome Completo</p>
          <input type="text" name="nomeCompleto" id="nomeCompleto" />

          <p>Email</p>
          <input type="email" name="email" id="email" />

          <p>Nick</p>
          <input type="text" name="nick" id="nick" />

          <p>CPF</p>
          <input type="text" name="cpf" id="cpf" />

          <p>Discord ID</p>
          <input type="text" name="DsID" id="DsID" />

          <div className={`DiscordServerID ${botaoSelecionado === 'botao2' ? 'show' : 'hide'}`}>
            <p>DiscordServerID</p>
            <input type="text" name="discordServerId" id="discordServerId" />
          </div>

          <p>Senha</p>
          <input type="password" name="senha" id="senha" />

          <p>Confirme a senha</p>
          <input type="password" name="confirmaSenha" id="confirmaSenha" />
        </div>
        <button onClick={handleClick}>Cadastrar-se</button>
      </div>
    </div>
  );
}

export default Cadastro;