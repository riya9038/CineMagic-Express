import { img_300, unavailable } from "../utils/constants";

export const MovieCard = ({ data }) => {
  console.log(data, "prps");

  return (
    <div className="movie-card">
      <div className="image-container">
        <img
          src={
            data.backdrop_path
              ? `${img_300}/${data?.backdrop_path}`
              : unavailable
          }
          alt="image"
        />
      </div>
      <div className="movie-info">
        <div className="movie-title">
          <p>{data?.original_title}</p>
          <p>{data?.overview}</p>
        </div>
        <div className="movie-rating">
          <p>{data?.vote_count}</p>
        </div>
      </div>
    </div>
  );
};
