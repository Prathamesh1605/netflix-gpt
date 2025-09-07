import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-56 p-2">
      <img alt="Movie poster" src={IMG_CDN + posterPath}></img>
    </div>
  );
};

export default MovieCard;
