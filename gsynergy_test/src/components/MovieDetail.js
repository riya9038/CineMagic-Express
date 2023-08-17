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
import { Divider, Snackbar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CustomizedSnackbars from "../common/Snackbar";

export const MovieDetailsCard = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);
  const [open, setOpen] = useState(false);

  const companies = movie?.production_companies
    ?.map((company) => company.name)
    .join(", ");

  return movie?.success == false ? (
    <ErrorScreen />
  ) : (
    <div
      className="bg-black flex p-16 w-full gap-10 items-center m-auto overflow-hidden detail-container"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="w-1/3 h-4/5 shadow-2xl shadow-zinc-500 rounded-md movie-poster">
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
      <div className="w-2/3 p-5 text-white movie-description">
        <h1 className="text-white text-4xl font-sans w-full mb-8">
          {movie?.original_title}
        </h1>
        <div className="flex flex-wrap movie-genres">
          {movie?.genres?.map((genre) => (
            <span
              className="italic bg-slate-500 rounded-full p-1.5 m-2 text-xs flex items-center "
              key={genre.id}
            >
              {genre.name}{" "}
            </span>
          ))}
        </div>
        <div className="flex gap-6 items-center my-8 movie-info">
          <div className="border-slate-400 border-2 p-2">
            {movie?.vote_average} Votes
          </div>
          <div className="border-slate-400 border-2 p-2 bg-white text-black">
            {Math.floor(movie?.runtime / 60)}hours {movie?.runtime % 60}mins
          </div>
          {!isFav ? (
            <FavoriteBorderIcon
              className="scale-150 cursor-pointer"
              onClick={() => {
                setIsFav(!isFav);
                setOpen(true);
              }}
            />
          ) : (
            <FavoriteIcon
              className="scale-150 text-red-600 bg-white cursor-pointer"
              onClick={() => {
                setIsFav(!isFav);
                setOpen(true);
              }}
            />
          )}
          {open && (
            <CustomizedSnackbars
              open={open}
              setOpen={setOpen}
              message={
                isFav ? "Added to Favourites" : "Removed from Favourites"
              }
            />
          )}
        </div>
        <h2 className="text-2xl mb-5">Overview</h2>
        <p className="text-md italic mb-8">{movie?.overview}</p>
        <div className="flex items-center gap-5 sub-info">
          <div>
            <h3 className="text-xl mb-2">Release Date</h3>
            <span className="text-gray-400 italic">{movie?.release_date}</span>
          </div>
          <Divider
            orientation="vertical"
            sx={{ height: "30px", borderColor: "gray" }}
          />
          <div>
            <h3 className="text-xl mb-2">Producers</h3>
            <span id="company.id" className="text-gray-400 italic">
              {companies}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
