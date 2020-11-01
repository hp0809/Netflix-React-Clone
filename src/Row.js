import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Row.css";
import YouTube from "react-youtube";
import key from "./API_KEY";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const imgBaseUrl = "https://image.tmdb.org/t/p/original"; //massive size fix in css
  const MoviesDB = require("moviedb-wrapper");
  const movieDB = new MoviesDB(key);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    const type = movie?.first_air_date ? "tv" : "movie";

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieDB
        .getTrailer(movie?.id, type)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""} `}
            src={`${imgBaseUrl}${
              isLargeRow || !movie.backdrop_path
                ? movie.poster_path
                : movie.backdrop_path
            }`}
            alt={movie.title || movie.original_name || movie.original_title}
          />
        ))}
      </div>
      {/*Eventually get this to ease in and out! */}
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={opts}
          containerClassName="row__trailer"
        />
      )}
    </div>
  );
}

export default Row;
