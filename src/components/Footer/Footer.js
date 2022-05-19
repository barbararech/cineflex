import "./style.css";

export default function Footer({movieTitle, movieImg, movieWeekday, movieDate}){
    return(
        <>
        <div className="containerFooter"> 
            <img src={movieImg} alt="movieBanner" />
            <div> 
                <p> {movieTitle}</p>
                {movieWeekday ? <p>{movieWeekday} - {movieDate}</p> : null}
            </div>
        </div>
        </>
    )
}