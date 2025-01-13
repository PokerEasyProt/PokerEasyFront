import './Login.css'
import TopLog from '../../Universal/TopLog'

function Login(){
    return(
        <div>
            <TopLog/>
            <div className="Login">
                <h1>Faça Login agora!</h1>
                <div className="LoginInputs">
                    <p>Email</p>
                    <input type="text" />
                    <p>Senha</p>
                    <input type="text" />
                </div>
            </div>
        </div>
    )
}
export default Login