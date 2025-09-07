import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector(
    (store) => store?.movies?.nowPlayingMovies?.results
  );

  const popularMovies = useSelector(
    (store) => store?.movies?.popularMovies?.results
  );

  return (
    <div className="bg-black">
      <div className="-mt-80 relative z-10">
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Popular Movies"} movies={popularMovies} />
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Now Playing"} movies={movies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
