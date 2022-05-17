import { Link } from "react-router-dom";
import "./style.css";
import Footer from "../Footer/Footer";

function Label(props){
    return (
        <div className="label">
            <button key={props.index} className={props.class}></button>
            <span>{props.text}</span>
        </div>
    )
}

export default function SelectSession(){
    
    //  Buttons labels
    const labels = [
        {
            class: "selected",
            text: "Selecionado"
        },
        {
            class: "available",
            text: "Disponível"
        },
        {
            class: "unavailable",
            text: "Indisponível"
        },
    ] 

    const buttonLabel =  labels.map((item, index) => (
        <Label class={item.class} text={item.text} key={index}/>
    ));

    // Buttons Seats
    let buttons=[];
    let i=0;

    while(i<50){
       i++;
       buttons.push(i);
    }

    const buttonSeat = buttons.map(function (item, index){
        return (
         <button key={index}> {index+1} </button>
        )
    })

    return(
        <>
            <p>Selecione o(s) assento(s)</p>
            <div className="containerSelectSession">
                <div className="buttonsSeat"> 
                    {buttonSeat}
                </div>
                <div className="buttonLabel"> 
                        {buttonLabel}
                </div>
                <div className="infoCostumer">
                    <span>Nome do Comprador:</span>
                    <input type="text" placeholder="Digite seu nome..." /> 
                    <span>CPF do Comprador:</span>
                    <input type="text" placeholder="Digite seu CPF..." /> 
                </div> 
                <Link to="/sucesso">
                    <button className="bookSeat">Reservar Assento(s)</button> 
                </Link>
            </div> 
        <Footer />
        </>
    )
}