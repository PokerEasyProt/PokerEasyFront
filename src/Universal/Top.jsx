import './Top.css'
import Adan from '../imgs/adan.png'

function Top(){
    return(
        <header className='TopT'>
            <div className="TopLogo">
                <h1>PokerEasy</h1>
            </div>
                <div className="Topbuttons">
                    <button>Solicitações</button>
                    <button><i class="bi bi-bell-fill"></i></button>
                    <div className='TopIcon'>
                        <img src={Adan} width={55} alt="icone de perfil" />
                    </div>
                </div>
        </header>
    )
}

export default Top