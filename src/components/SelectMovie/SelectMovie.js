import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";

function Image({source, id, index}){
    return(
        <Link to={`/filme/${id}`}>
            <img src={source} key={index} alt="movieBanner" />
        </Link>
    )
}

export default function SelectMovie(){

    const [images, setImages] = useState([]);   
    
    useEffect(()=>{
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

        promise.then(response => {
            setImages(response.data);
        }); 
    },[]);
    
    return(
        <>
            <div className="containerSelectMovie">
                <h5>Selecione o filme</h5>
                <div className="gridContainer">
                    {images.length === 0 ? 'Carregando' :
                        images.map((image,index) => <Image source={image.posterURL} key={index} id={image.id}/>)
                    }
                </div>
            </div>
        </>
    )
}