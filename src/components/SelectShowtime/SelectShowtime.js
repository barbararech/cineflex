import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import Footer from "../Footer/Footer";

function Showtime({index, days}){

    return(
        <div className="containerSelectShowtime" key={index}>
            {days.map(({weekday, date, showtimes})=>{
                    return(
                        <>
                            <span>{weekday} - {date}</span>
                            <div className="buttonsHour"> 
                                {showtimes.map(({name, id})=>{
                                    return(
                                        <Link to={`/sessao/${id}`}>
                                            <button>{name}</button> 
                                        </Link>
                                    );
                                })}
                            </div>
                        </>
                    )
                })
            }
        </div>       
    )
}

export default function SelectShowtime(){

    const [movies, setMovies] = useState([]);
    const  { id }  = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
    
        promise.then((response) => {
          setMovies([response.data]);
        })
      }, []);

      console.log(movies)
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
            <Footer />
        </>
    )
}