import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_key, img_300 } from "../utils/constants";

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetchDetail();
  }, []);
  const fetchDetail = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
    );
    const dataJ = await data.json();
    console.log(dataJ, "DATA");
    setMovie(dataJ);
  };
  return Object.keys(movie).length === 0 ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="bg-black flex p-16 w-full gap-10">
      <div className="w-1/4 h-108 shadow-2xl shadow-zinc-500 rounded-md">
        <img
          src={`${img_300}/${movie?.poster_path}`}
          alt="poster"
          className="w-full h-full bg-center rounded-md"
        />
      </div>
      <div className="w-3/4 p-5 text-white">
        <h1 className="text-white text-6xl font-sans w-full mb-8">
          {movie?.original_title}
        </h1>
        {movie?.genres.map((genre) => (
          <span className="italic bg-slate-500 rounded-full p-1.5 m-2 text-xs ">
            {genre.name}{" "}
          </span>
        ))}
        <div className="flex gap-6 my-8">
          <div className="border-slate-400 border-2 p-2">
            {movie?.vote_average} Votes
          </div>
          <div className="border-slate-400 border-2 p-2 bg-white text-black">
            {Math.floor(movie?.runtime / 60)}hours {movie?.runtime % 60}mins
          </div>
        </div>
        <h2 className="text-2xl mb-5">Overview</h2>
        <p className="text-md italic mb-8">{movie?.overview}</p>
        <h2 className="text-2xl mb-2">Release Date</h2>
        <p>{movie?.release_date}</p>
      </div>
    </div>
  );
};
