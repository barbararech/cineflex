import "./style.css";

export default function Footer({movieTitle, movieImg, movieWeekday, movieHour}){
    return(
        <>
        <div className="containerFooter"> 
            <img src={movieImg} alt="movieBanner" />
            <div> 
                <p> {movieTitle}</p>
                {movieWeekday ? <p>{movieWeekday} - {movieHour}</p> : null}
            </div>
        </div>
        </>
    )
}
