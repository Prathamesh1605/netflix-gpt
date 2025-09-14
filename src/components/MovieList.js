import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll space-x-4 hide-scrollbar">
        <div className="flex">
          {movies?.map((Movie) => {
            console.log(movies);
            return (
              <MovieCard
                posterPath={Movie.poster_path}
                title={Movie.original_title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
