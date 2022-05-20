import { useParams, useNavigate } from "react-router-dom";
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

function Seats({index, id, isAvailable, name, seatId, setSeatId}){
    const [buttonClassName, setButtonClassName] = useState(`${isAvailable ? "available" : "unavailable"}`);

    return (
        <button key={index} 
                className={buttonClassName} 
                id={id} 
                name={name} 
                onClick={()=> {
                    SaveInfoSeats(buttonClassName, seatId, setSeatId, id)
                    SelectSeats(buttonClassName, setButtonClassName, id, seatId, setSeatId)                  
                }} 
            > {name} 
        </button>
    )
}

function SelectSeats(buttonClassName, setButtonClassName, seatId, setSeatId, id ){

    if (buttonClassName === "available"){
        setButtonClassName("selected");
        // setSeatId([...seatId, id]);
    } 
    if (buttonClassName === "selected"){
        setButtonClassName("available");
        // let seatIdRemoved = seatId.filter(e => !seatId.includes(id));
        // setSeatId(seatIdRemoved);
        // console.log(seatIdRemoved)
    }
}
function SaveInfoSeats(buttonClassName, seatId, setSeatId, id){
    if(buttonClassName === "available"){
        setSeatId([...seatId, id]);
    } else{
       let seatIdRemoved = [...seatId].filter(seat => !(seat === id));
       setSeatId(seatIdRemoved);
       console.log([...seatId])
       console.log(seatIdRemoved)
    }
}

export default function SelectSession(){
    let navigate = useNavigate();

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
    const [seatId, setSeatId] = useState([]);
    const buttonSeat = movieSeats.map((seat, index) => (
        <Seats key={index} 
               id={seat.id} 
               name={seat.name} 
               isAvailable={seat.isAvailable}
               seatId={seatId}
               setSeatId={setSeatId}/>
    ));
       
    // Form
    const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");

    function Book (event) {
		event.preventDefault(); 
        if(seatId.length>0){
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {
                ids: seatId,
                name: name,
                cpf: Number(cpf)
            });

            promise.then((response)=>{
                navigate("/sucesso");
            })
        } else{
            alert("Selecione pelo menos um assento!");
        }

    }

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
                <form onSubmit={Book}>
                    <div className="infoCostumer">
                        <span>Nome do Comprador:</span>
                        <input type="text" 
                               value={name} 
                               required 
                               onChange={e => setName(e.target.value)}
                               placeholder="Digite seu nome..." 
                        /> 
                        <span>CPF do Comprador:</span>
                        <input type="text" 
                               value={cpf} 
                               required 
                               onChange={e => setCpf(e.target.value)}
                               placeholder="Digite seu CPF..."
                        /> 
                        <button type="submit" className="bookSeat">Reservar Assento(s)</button> 
                    </div> 
                </form>
            </div> 
            <Footer movieTitle={movieTitle} 
                    movieImg={movieImg} 
                    movieWeekday={movieWeekday} 
                    movieHour={movieHour}/>
        </>
    )
}