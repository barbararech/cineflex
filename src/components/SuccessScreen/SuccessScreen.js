import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function SuccessScreen(){
    const { state } = useLocation();

    return(
        <>
            <div className="containerSuccessScreen">
                <h5>Pedido feito com sucesso!</h5>
                <div className="infoSuccess">
                    <p>Filme e sessão</p>
                    <span>{state.bookingInfo.title}</span>
                    <span>{state.bookingInfo.day} {state.bookingInfo.hour}</span>
                    <p>Ingressos</p>
                        {state.bookingInfo.seats.map((seat, index)=>{
                            return(
                                <span key={index}>Assento {seat}</span>
                            );
                        })}
                    <p>Comprador</p>
                    <span>Nome: {state.bookingInfo.costumer}</span>
                    <span>CPF: {state.bookingInfo.costumerCpf}</span>
                </div> 
                <Link to="/">
                    <button className="bookSeat">Voltar para Home</button> 
                </Link>
            </div> 
        </>
    )
}