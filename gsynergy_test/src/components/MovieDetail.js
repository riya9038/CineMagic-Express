import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  api_key,
  img_300,
  unavailable,
} from "../utils/constants";
import { Shimmer } from "./Shimmer";
import { ErrorScreen } from "./ErrorScreen";

export const MovieDetailsCard = ({ movie }) =>
  movie?.success == false ? (
    <ErrorScreen />
  ) : (
    <div
      className="bg-black flex p-16 w-full gap-10 items-center overflow-hidden detail-container"
      style={{ height: "86.45%" }}
    >
      <div className="w-1/4 h-3/4 shadow-2xl shadow-zinc-500 rounded-md movie-poster">
        <img
          src={
            movie?.poster_path
              ? `${img_300}/${movie?.poster_path}`
              : unavailable
          }
          alt="poster"
          className="w-full h-full bg-center rounded-md"
        />
      </div>
      <div className="w-3/4 p-5 text-white movie-description">
        <h1 className="text-white text-6xl font-sans w-full mb-8">
          {movie?.original_title}
        </h1>
        <div className="flex flex-wrap movie-genres">
          {movie?.genres?.map((genre) => (
            <span
              className="italic bg-slate-500 rounded-full p-1.5 m-2 text-xs "
              key={genre.id}
            >
              {genre.name}{" "}
            </span>
          ))}
        </div>
        <div className="flex gap-6 my-8 movie-info">
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

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDetail();
    setIsLoading(true);
  }, []);

  const fetchDetail = async () => {
    const data = await fetch(`${API_BASE_URL}/movie/${id}?api_key=${api_key}`);
    const dataJson = await data.json();
    setIsLoading(false);
    setMovie(dataJson);
  };
  return isLoading ? (
    <Shimmer parent="detail" />
  ) : (
    <MovieDetailsCard movie={movie} />
  );
};
