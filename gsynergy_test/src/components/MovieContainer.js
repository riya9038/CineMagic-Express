import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { api_key } from "../utils/constants";
import { Link } from "react-router-dom";
import { fetchContent, fetchSearchText } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Shimmer } from "./Shimmer";

export const MovieContainer = () => {
  const moviesList = useSelector((state) => state.movies.movieList);
  const searchText = useSelector((state) => state.movies.searchText);
  const total_pages = useSelector((state) => state.movies.total_pages);

  // const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchText.length === 0) dispatch(fetchContent(page));
  }, [dispatch, page]);

  // useEffect(() => {
  //   if (moviesList?.results) {
  //     setList((prev) => [...prev, ...moviesList?.results]);
  //   }
  // }, [moviesList]);

  const handleFetchMore = () => {
    const nextPage = page + 1;
    if (searchText.length > 0)
      dispatch(fetchSearchText({ searchText, page: nextPage }));
    else dispatch(fetchContent(nextPage));
    setPage(nextPage);
  };

  return (
    <div className="flex flex-wrap p-5 items-center bg-black">
      {moviesList?.length === 0 ? (
        <Shimmer />
      ) : (
        <InfiniteScroll
          className="flex flex-wrap gap-10"
          dataLength={moviesList.length}
          hasMore={page < total_pages} // Adjusted the condition
          next={handleFetchMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={0.5}
        >
          {moviesList.map((movie) => (
            <Link
              to={`/detail/${movie?.id}`}
              key={movie?.id} // Added key prop
              style={{ textDecoration: "none" }}
            >
              <MovieCard data={movie} />
            </Link>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
