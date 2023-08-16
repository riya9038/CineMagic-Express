import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { Link } from "react-router-dom";
import { fetchContent, fetchSearchText } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Shimmer } from "./Shimmer";

export const MovieContainer = () => {
  const moviesList = useSelector((state) => state.movies.movieList);
  const searchText = useSelector((state) => state.movies.searchText);
  const total_pages = useSelector((state) => state.movies.total_pages);
  const type = useSelector((state) => state.movies.type);

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchText.length === 0) dispatch(fetchContent({ page, type: "all" }));
  }, [dispatch, page]);

  const handleFetchMore = () => {
    const nextPage = page + 1;
    if (searchText.length > 0)
      dispatch(fetchSearchText({ searchText, page: nextPage, type }));
    else dispatch(fetchContent({ page: nextPage, type }));
    setPage(nextPage);
  };

  return moviesList?.length === 0 ? (
    <Shimmer parent="container" />
  ) : (
    <div className="flex flex-wrap p-5 items-center bg-black" role="container">
      <InfiniteScroll
        className="flex flex-wrap gap-8 justify-between infinite-scroll-container"
        dataLength={moviesList.length}
        hasMore={page < total_pages}
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
            key={movie?.id}
            style={{ textDecoration: "none" }}
          >
            <MovieCard data={movie} />
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};
