import './Top.css'
import { useNavigate } from 'react-router-dom';

function TopLoggout(){

    const navigate = useNavigate()

    const cu = () => {
        navigate('/Cadastro')
    }
    const cu2 = () => {
        navigate('/Login')
    }

    return(
        <header className='Top'>
            <div className="TopLogo">
                <h1>PokerEasy</h1>
            </div>
            <div className="TopRestLoggout">
                <button onClick={cu2}>Login</button>
                <button onClick={cu}>Cadastre-se</button>
            </div>
        </header>
    )
}

export default TopLoggout

