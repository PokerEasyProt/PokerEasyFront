import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileMenu.css"; // Importando o CSS separado
import Icon from '../imgs/icon.png'
import axios from "axios";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
     axios.post('/logout')
     window.location.reload();
    }

  return (
    <div
      className="profile-menu-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Botão do Perfil */}
      <button className="profile-button"><img src={Icon} width={55} height={55} alt="icone de perfil" /></button>

      {/* Menu Suspenso */}
      <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
          <li>
            <Link to="/support">Suporte</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
