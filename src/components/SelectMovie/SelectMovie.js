import "./style.css";
import movie from "../../assets/images/image 3.png"

export default function SelectMovie(){
    return(
        <>
            <p>Selecione o filme</p>
            <div className="gridContainer">
                <img src={movie} alt="movieBanner" />
                <img src={movie} alt="movieBanner" />
                <img src={movie} alt="movieBanner" />
                <img src={movie} alt="movieBanner" />
                <img src={movie} alt="movieBanner" />
                <img src={movie} alt="movieBanner" />
                <img src={movie} alt="movieBanner" />
            </div>
        </>
    )
}