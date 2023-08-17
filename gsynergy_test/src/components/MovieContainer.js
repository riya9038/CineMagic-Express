import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { Link } from "react-router-dom";
import { fetchContent, fetchSearchText } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Shimmer } from "./Shimmer";
import { ErrorScreen } from "./ErrorScreen";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

export const MovieContainer = () => {
  const { movieList, searchText, total_pages, error } = useSelector(
    (state) => state.movies
  );
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchText.length === 0 && page == 1) dispatch(fetchContent({ page }));
  }, [dispatch, page]);

  const handleFetchMore = () => {
    const nextPage = page + 1;
    if (searchText.length > 0) {
      dispatch(fetchSearchText({ searchText, page: nextPage }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else dispatch(fetchContent({ page: nextPage }));
    setPage(nextPage);
  };

  if (error) {
    console.error(error);
    return <ErrorScreen />;
  }

  return movieList?.length === 0 ? (
    <Shimmer parent="container" />
  ) : (
    <div
      className="flex flex-wrap p-5 items-center bg-black h-5/6"
      role="container"
    >
      <InfiniteScroll
        className="h-full overflow-scroll flex flex-wrap gap-5 justify-center py-5 infinite-scroll-container "
        dataLength={movieList?.length}
        hasMore={page < total_pages}
        next={handleFetchMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollThreshold={0.5}
      >
        {movieList?.map((movie) => (
          <Link
            to={`/detail/${movie?.id}`}
            key={movie?.id}
            style={{ textDecoration: "none" }}
          >
            <MovieCard data={movie} />
          </Link>
        ))}
      </InfiniteScroll>

      {window.innerHeight <= window.scrollY && (
        <ExpandCircleDownOutlinedIcon
          className="rotate-180 fixed bottom-8 right-8 bg-white scale-150 rounded-full cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
    </div>
  );
};
