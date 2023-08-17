import { useEffect, useState } from "react";
import {
  clearList,
  fetchSearchText,
  handleSearchText,
} from "../store/movieSlice";
import { useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export const Header = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleSearchText(e.target.value));
    setText(e.target.value);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      dispatch(clearList());
      dispatch(fetchSearchText({ searchText: text, page: 1 }));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <div className="h-1/6 w-full p-5 flex justify-between items-center rounded-10 bg-orange-400 shadow-md shadow-slate-600 header z-50 sticky top-0">
      <Link to="/">
        <div className="flex items-center gap-5">
          <div className="logo w-16 h-16 flex items-center shadow-4xl shadow-slate-800">
            <img
              className="w-full h-full"
              src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
            />
          </div>
          <h2 className="text-2xl font-mono m-0 font-semibold first-letter:text-4xl">
            {" "}
            CineMagic <br /> Express Hub
          </h2>
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
          <p className="flex items-center gap-2">
            <HomeIcon /> <span className="font-mono ">Home</span>
          </p>
        </Link>
        <p className="flex items-center gap-2 cursor-pointer">
          <LiveTvIcon />
          <span className="font-mono ">TV Shows</span>
        </p>
        <p className="flex items-center gap-2 cursor-pointer">
          <MovieIcon />
          <span className="font-mono "> Movies</span>
        </p>
        <p className="cursor-pointer">
          <AccountCircleIcon className="scale-150" />
        </p>
      </div>
    </div>
  );
};
