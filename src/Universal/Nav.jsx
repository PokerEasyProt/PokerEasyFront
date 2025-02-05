import './Nav.css'

function Nav(){
    return(
        <nav>
                    <div className="click">
                        <i className="bi bi-arrow-bar-right" id="exp"></i>
                    </div>
                    <ul>
                        <li className="abas">
                            <a href="/">
                            <span className="icon"><i className="bi bi-house"></i></span>
                            <span className="text">Home</span>
                            </a>
                        </li>
                        <li className="abas">
                            <a href="/perfil">
                            <span className="icon"><i className="bi bi-person-square"></i></span>
                            <span className="text">Perfil</span>
                            </a>
                        </li>
                        <li className="abas">
                            <a href="/score">
                            <span className="icon"><i className="bi bi-graph-up-arrow"></i></span>
                            <span className="text">Meu_Desepenho</span>
                            </a>
                        </li>
                        <li className="abas">
                            <a href="/team">
                            <span className="icon"><i className="bi bi-people-fill"></i></span>
                            <span className="text">Time</span>
                            </a>
                        </li>
                        <li className="abas">
                            <a href="/report">
                            <span className="icon"><i className="bi bi-arrow-return-right"></i></span>
                            <span className="text">Reportar</span>
                            </a>
                        </li>
                        <li className="abas">
                            <a href="/ticket">
                            <span className="icon"><i className="bi bi-ticket-detailed"></i></span>
                            <span className="text">Ticket</span>
                            </a>
                        </li>
                        <li className="abas">
                            <a href="settings">
                            <span className="icon"><i className="bi bi-gear"></i></span>
                            <span className="text">Configuração</span>
                            </a>
                        </li>
                    </ul>
                </nav>
    )
}
export default Nav