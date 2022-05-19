import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import Footer from "../Footer/Footer";

function Showtime({index, days}){

    const daysMovies = days.map(({weekday, date, showtimes})=>{
        const showtimeMovie = showtimes.map(({name, id})=>{
            return(
                <Link to={`/sessao/${id}`}>
                    <button>{name}</button> 
                </Link>
            );
        })

        return(
            <>
                <span>{weekday} - {date}</span>
                <div className="buttonsHour"> 
                    {showtimeMovie}
                </div>
            </>
        )
    });

    return(
        <div className="containerSelectShowtime" key={index}>
            {daysMovies}
        </div>       
    )
}

export default function SelectShowtime(){

    const [movieTitle, setMovieTitle] = useState([]);  
    const [movieImg, setMovieImg] = useState([]);  
    const [movies, setMovies] = useState([]);
    const  { id }  = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
    
        promise.then((response) => {
          setMovies([response.data]);
          setMovieTitle(`${response.data.title}`)
          setMovieImg(`${response.data.posterURL}`)
        })
      }, []);

    const moviesShowtime = movies.map((movie,index) => 
       ( <Showtime title={movie.title} 
                  source={movie.posterURL} 
                  key={index} 
                  id={movie.id} 
                  days={movie.days}/>));
    
    return(
        <>
            <h5>Selecione o horário</h5>
            {movies.length === 0 ? 'Carregando' : moviesShowtime}        
            <Footer movieTitle={movieTitle} 
                    movieImg={movieImg} />
        </>
    )
}