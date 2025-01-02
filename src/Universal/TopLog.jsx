import './Top.css'

function TopLoggout(){
    return(
        <header className='Top'>
            <div className="TopLogo">
                <h1>PokerEasy</h1>
            </div>
            <div className="TopRestLoggout">
                <button>Login</button>
                <button>Cadastre-se</button>
            </div>
        </header>
    )
}

export default TopLoggout

