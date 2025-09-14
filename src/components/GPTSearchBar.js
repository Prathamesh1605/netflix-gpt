import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { openai } from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovies } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movie in tmdb
  const searchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };
  const handleGPTSearchClick = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ".Only give me names of 5 comma separated movies.Example for the response is as follows: Gadar, Mr India, Ravan, Singham,Bahubali";
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: gptQuery }],
    });

    const gptMovies = completion.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => {
      return searchMovie(movie);
    });
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGPTMovies({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-80 flex w-full max-w-lg">
        <form
          className="flex w-full max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            placeholder={lang[langKey].gptSearchPlaceholder}
            className="flex-grow px-4 py-2 mr-2 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-r-md hover:bg-red-700 transition"
            onClick={handleGPTSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GPTSearchBar;
