import { img_300, unavailable } from "../utils/constants";

export const MovieCard = ({ data }) => {
  return (
    <div className="w-52 h-80 rounded-md bg-white flex flex-col items-center justify-between cursor-pointer shadow-md shadow-gray-600 p-2.5">
      <div className="w-full h-64 rounded-t-md">
        <img
          src={
            data?.backdrop_path
              ? `${img_300}/${data?.backdrop_path}`
              : unavailable
          }
          alt="image"
          className="w-full h-full bg-center rounded-t-md"
        />
      </div>
      <div className="h-36 w-full text-black text-decoration-none flex justify-between p-2 font-sans bg-slate-300 shadow-md shadow-slate-500">
        <div className="overflow-hidden movie-title">
          <p className="m-0 text-md font-semibold">
            {data?.original_title || data?.name}
          </p>
          <p className="m-0 text-xs text-overflow-ellipsis">{data?.overview}</p>
        </div>
        <div className="flex items-baseline text-xs mt-1">
          <p className="m-0">{data?.vote_count}</p>
        </div>
      </div>
    </div>
  );
};
