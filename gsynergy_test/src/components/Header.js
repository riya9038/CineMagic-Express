import { useEffect, useState } from "react";
import {
  changeType,
  clearList,
  fetchContent,
  fetchSearchText,
  handleSearchText,
} from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export const Header = () => {
  const [text, setText] = useState("");
  const type = useSelector((state) => state.movies.type);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleSearchText(e.target.value));
    setText(e.target.value);
  };

  const handleChangeType = (name) => {
    dispatch(changeType(name));
  };

  useEffect(() => {
    dispatch(clearList());
    dispatch(fetchContent({ page: 1, type }));
  }, [type]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      dispatch(clearList());
      dispatch(fetchSearchText({ searchText: text, page: 1, type }));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <div className="h-24 w-full p-5 flex justify-between items-center rounded-10 bg-cyan-400 shadow-xl shadow-slate-600 header sticky top-0 z-50">
      <Link to="/">
        <div
          className="logo w-16 h-16 flex items-center shadow-4xl shadow-slate-800"
          onClick={() => handleChangeType("all")}
        >
          <img
            className="w-full h-full"
            src="https://img.freepik.com/free-vector/flat-clapperboard-icon_1063-38.jpg"
          />
        </div>
      </Link>
      <div className="flex relative w-96 search-bar">
        <SearchIcon className="absolute top-2.5 left-2 search-icon" />
        <input
          className="rounded-xl h-4 w-full flex items-center p-5 px-10 shadow-gray-600 shadow-md input-box"
          type="search"
          value={text}
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center justify-between gap-10 text-lg mr-20 w-50% header-list">
        <Link to="/">
          <p
            className="flex items-center gap-2"
            onClick={() => handleChangeType("all")}
          >
            <HomeIcon /> <span>Home</span>
          </p>
        </Link>
        <p
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleChangeType("tv")}
        >
          <LiveTvIcon />
          <span>TV Shows</span>
        </p>
        <p
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleChangeType("movie")}
        >
          <MovieIcon />
          <span> Movies</span>
        </p>
        <p className="cursor-pointer">
          <AccountCircleIcon className="scale-150" />
        </p>
      </div>
    </div>
  );
};
