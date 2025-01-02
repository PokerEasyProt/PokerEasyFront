import './Nav.css'

function Nav(){
    return(
        <nav>
                    <div class="click">
                        <i class="bi bi-arrow-bar-right" id="exp"></i>
                    </div>
                    <ul>
                        <li class="abas">
                            <a href="/">
                            <span class="icon"><i class="bi bi-house"></i></span>
                            <span class="text">Home</span>
                            </a>
                        </li>
                        <li class="abas">
                            <a href="/perfil">
                            <span class="icon"><i class="bi bi-person-square"></i></span>
                            <span class="text">Perfil</span>
                            </a>
                        </li>
                        <li class="abas">
                            <a href="/score">
                            <span class="icon"><i class="bi bi-graph-up-arrow"></i></span>
                            <span class="text">Meu_Desepenho</span>
                            </a>
                        </li>
                        <li class="abas">
                            <a href="/team">
                            <span class="icon"><i class="bi bi-people-fill"></i></span>
                            <span class="text">Time</span>
                            </a>
                        </li>
                        <li class="abas">
                            <a href="/report">
                            <span class="icon"><i class="bi bi-arrow-return-right"></i></span>
                            <span class="text">Reportar</span>
                            </a>
                        </li>
                        <li class="abas">
                            <a href="/ticket">
                            <span class="icon"><i class="bi bi-ticket-detailed"></i></span>
                            <span class="text">Ticket</span>
                            </a>
                        </li>
                        <li class="abas">
                            <a href="settings">
                            <span class="icon"><i class="bi bi-gear"></i></span>
                            <span class="text">Configuração</span>
                            </a>
                        </li>
                    </ul>
                </nav>
    )
}
export default Nav