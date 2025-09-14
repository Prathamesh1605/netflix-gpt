import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  return (
    <div className="w-56 p-2">
      {posterPath ? (
        <img alt="Movie poster" src={IMG_CDN + posterPath}></img>
      ) : (
        <h4 className="flex justify-center items-center">{title}</h4>
      )}
    </div>
  );
};

export default MovieCard;
