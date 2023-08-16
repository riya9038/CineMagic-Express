import { img_300, unavailable } from "../utils/constants";
import GradeIcon from "@mui/icons-material/Grade";

export const MovieCard = ({ data }) => {
  return (
    <div className="w-52 h-80 rounded-md bg-white flex flex-col items-center justify-between cursor-pointer shadow-md shadow-gray-600 p-2.5">
      <div className="w-full h-56 rounded-t-md bg-center overflow-hidden">
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
      <div className="h-24 w-full text-black text-decoration-none flex justify-between p-2 font-sans bg-slate-300 shadow-md shadow-slate-500">
        <div className="overflow-hidden w-full">
          <div className="flex justify-between items-start">
            <p className="m-0 text-md font-medium w-3/4">
              {data?.original_title || data?.name}
            </p>
            <p className="m-0 text-xs mt-1 flex items-center w-1/4 justify-start bg-green-400 px-2">
              <span>{Math.floor(data?.vote_average)}</span>
              <GradeIcon className="scale-50" />
            </p>
          </div>
          <div className="w-full text-xs flex">
            <p className="truncate text-xs w-2/3">{data?.overview}</p>
            {data?.overview && <p className="text-xs w-1/3">(2 lines)</p>}
          </div>
        </div>
        <div className="flex items-start text-xs mt-1"></div>
      </div>
    </div>
  );
};
