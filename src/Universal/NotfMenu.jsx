import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileMenu.css"; // Importando o CSS separado
import Icon from '../imgs/icon.png'
import axios from "axios";

const NotfMenu = () => {
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
      <button className="profile-button"><i className="bi bi-bell-fill"></i></button>

      {/* Menu Suspenso */}
      <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <p>Você ainda não tem nenhuma notificação!</p>
        </ul>
      </div>
    </div>
  );
};

export default NotfMenu;
