import './Top.css'
import Adan from '../imgs/adan.png'
import Icon from '../imgs/icon.png'
import ProfileMenu from './ProfileMenu'

function Top(){
    return(
        <header className='TopT'>
            <div className="TopLogo">
                <h1>PokerEasy</h1>
            </div>
                <div className="Topbuttons">
                    <div className="b">
                    <button>Solicitações</button>
                    <button><i className="bi bi-bell-fill"></i></button>
                    </div>
                    <div className='TopIcon'>
                    <ProfileMenu/>                        
                    </div>
                </div>
        </header>
    )
}

export default Top