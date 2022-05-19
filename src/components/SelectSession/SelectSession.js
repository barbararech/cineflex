import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
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
    
    const [movieTitle, setMovieTitle] = useState([]);  
    const [movieImg, setMovieImg] = useState([]);  
    const [movieWeekday, setMovieWeekday] = useState([]);  
    const [movieDate, setMovieDate] = useState([]);  
    const [session, setSession] = useState([]);
    const  { id }  = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
    
        promise.then((response) => {
          setSession([response.data]);
          setMovieTitle(`${response.data.movie.title}`);
          setMovieImg(`${response.data.movie.posterURL}`);
          setMovieWeekday(`${response.data.day.weekday}`);
          setMovieDate(`${response.data.day.date}`);
        })
      }, []);

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
            <h5>Selecione o(s) assento(s)</h5>
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
            <Footer movieTitle={movieTitle} 
                    movieImg={movieImg} 
                    movieWeekday={movieWeekday} 
                    movieDate={movieDate}/>
        </>
    )
}