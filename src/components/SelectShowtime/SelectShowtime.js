import { Link } from "react-router-dom";
import "./style.css";
import Footer from "../Footer/Footer";

export default function SelectMovie(){
    return(
        <>
            <p>Selecione o horário</p>
            <div className="containerSelectShowtime">
                 <span>Quinta-Feira - 24/06/2021</span>
                 <div className="buttonsHour"> 
                    <Link to="/sessao/id">
                        <button>15:00</button> 
                    </Link>
                    <Link to="/sessao/id">
                    <button>18:00</button> 
                    </Link>
                 </div>
            </div> 
            <div className="containerSelectShowtime">
                 <span>Quinta-Feira - 24/06/2021</span>
                 <div className="buttonsHour"> 
                    <Link to="/sessao/id">
                        <button>15:00</button> 
                    </Link>
                    <Link to="/sessao/id">
                    <button>18:00</button> 
                    </Link>
                 </div>
            </div> 
            
        <Footer />
        </>
    )
}