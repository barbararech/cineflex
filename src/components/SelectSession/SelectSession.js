import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import Footer from "../Footer/Footer";

function Label({index, className, text}){
    return (
        <div className="label">
            <button key={index} className={className}></button>
            <span>{text}</span>
        </div>
    )
}

function Seats({index, id, isAvailable, name}){

    const [buttonClassName, setButtonClassname] = useState(`${isAvailable ? "available" : "unavailable"}`)


    return (
        <button key={index} className={buttonClassName} id={id} name={name} onClick={()=> {
            SelectSeats(buttonClassName, setButtonClassname, id);
            }} > {name} 
        </button>
    )
}

function SelectSeats(buttonClassName, setButtonClassname){

    if (buttonClassName === "available"){
        setButtonClassname("selected");
    } 
    if (buttonClassName === "selected"){
        setButtonClassname("available");
    } 

}

export default function SelectSession(){
    
    const [movieTitle, setMovieTitle] = useState([]);  
    const [movieImg, setMovieImg] = useState([]);  
    const [movieWeekday, setMovieWeekday] = useState([]);  
    const [movieHour, setMovieHour] = useState([]);  
    const [movieSeats, setMovieSeats] = useState([]);  
    const [session, setSession] = useState([]);
    const  { id }  = useParams();

    // API
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
    
        promise.then((response) => {
          setSession([response.data]);
          setMovieSeats([...response.data.seats]);
          setMovieTitle(`${response.data.movie.title}`);
          setMovieImg(`${response.data.movie.posterURL}`);
          setMovieWeekday(`${response.data.day.weekday}`);
          setMovieHour(`${response.data.name}`);
        })
      }, []);

    //  Buttons labels
    const labels = [
        {
            className: "selected",
            text: "Selecionado"
        },
        {
            className: "available",
            text: "Disponível"
        },
        {
            className: "unavailable",
            text: "Indisponível"
        },
    ] 

    const buttonLabel =  labels.map((item, index) => (
        <Label className={item.className} text={item.text} key={index}/>
    ));

    //  Buttons seats
    const buttonSeat = movieSeats.map((seat, index) => (
        <Seats key={index} id={seat.id} name={seat.name} isAvailable={seat.isAvailable}/>
    ));

    //  UI
    return(
        <>
            <h5>Selecione o(s) assento(s)</h5>
            <div className="containerSelectSession">
                <div className="buttonsSeat"> 
                    {session.length === 0 ? 'Carregando' : buttonSeat}  
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
            <Footer movieTitle={movieTitle} 
                    movieImg={movieImg} 
                    movieWeekday={movieWeekday} 
                    movieHour={movieHour}/>
        </>
    )
}