import './Top.css'
import Adan from '../imgs/adan.png'

function Top(){
    return(
        <header className='TopT'>
            <div className="TopLogo">
                <h1>PokerEasy</h1>
            </div>
                <div className="Topbuttons">
                    <button>Login</button>
                    <button>Cadastre-se</button>
                    <div className='TopIcon'>
                        <img src={Adan} width={55} alt="icone de perfil" />
                    </div>
                </div>
        </header>
    )
}

export default Top