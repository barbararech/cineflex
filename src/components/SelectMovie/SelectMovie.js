import { Link } from "react-router-dom";
import "./style.css";
import movie from "../../assets/images/image 3.png";

export default function SelectMovie(){
    return(
        <>
            <div className="containerSelectMovie">
                <h5>Selecione o filme</h5>
                <div className="gridContainer">
                    <Link to="/filme/id">
                        <img src={movie} alt="movieBanner" /> 
                    </Link>
                    <img src={movie} alt="movieBanner" />
                    <img src={movie} alt="movieBanner" />
                    <img src={movie} alt="movieBanner" />
                    <img src={movie} alt="movieBanner" />
                    <img src={movie} alt="movieBanner" />
                    <img src={movie} alt="movieBanner" />
                </div>
            </div>
        </>
    )
}