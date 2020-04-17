import React from "react";

const DEFAULT_IMG_HREF = "https://www.macmillandictionary.com/us/external/slideshow/thumb/Grey_thumb.png";

const Movie = ({movie}) => {
    const poster = (movie.Poster === "N/A") ? DEFAULT_IMG_HREF : movie.Poster;
    return (
        <div className="movie">
            <h2>{movie.Title}</h2>
            <div>
                <img width="200" alt={`The movie titled: ${movie.Title}`} src={poster}/>
            </div>
            <p>({movie.Year})</p>
        </div>
    )
}

export default Movie;