import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { api_key } from "../utils/constants";
import { Link } from "react-router-dom";
import { fetchContent } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";

export const MovieContainer = () => {
  const [list, setList] = useState([]);
  const moviesList = useSelector((state) => state.movies.moviesList);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchContent());
  // }, [dispatch]);

  setList(moviesList);

  return (
    <div className="container">
      {/* {list?.length === 0 ? (
        <p>Loading</p>
      ) : (
        list
          ?.filter(
            (movie) =>
              movie.media_type == "movie" && movie.original_language == "en"
          )
          .map((movie) => (
            <Link to={`/detail/${movie.id}`} style={{ textDecoration: "none" }}>
              <MovieCard data={movie} />
            </Link>
          ))
      )} */}
    </div>
  );
};
