import Top from "../Universal/Top";
import Nav from "../Universal/Nav";
import './TeamView.css'

import adan from "../imgs/adan.png"

function TeamView(){

    return(
        <div>
            <Nav/>
            <Top/>
            <div className="TeamView b">
                <div className="leftTV">
                    <div className="upTV">
                        <img src={adan} alt="" />
                        <div className="textTV1">
                            <h1>Teste</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, dicta vitae nesciunt, nihil quo aliq
                            </p>
                        </div>
                    </div>
                    <div className="downTV">
                        <p>ID discord</p>

                    </div>
                </div>
                <div className="rightTV">
                    <section className="flutterTV">
                        <h1>teste</h1>
                        </section>
                    <section className="flutterTV">
                        <h1>teste</h1>
                    </section>
                    <section className="flutterTV">
                        <h1>teste</h1>
                    </section>
                </div>
            </div>
        </div>
    )


}
export default TeamView