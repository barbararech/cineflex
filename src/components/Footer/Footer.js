import "./style.css";
import movie from "../../assets/images/image 3.png";

export default function Footer(){
    return(
        <>
        <div className="containerFooter"> 
            <img src={movie} alt="movieBanner" />
            <div> 
                <p>Enola Holmes</p>
                <p>Quinta-Feira - 15:00</p>
            </div>
        </div>
        </>
    )
}