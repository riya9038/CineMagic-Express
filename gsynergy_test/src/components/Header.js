import { useEffect, useState } from "react";
import {
  clearList,
  fetchContent,
  fetchSearchText,
  handleSearchText,
} from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleSearchText(e.target.value));
    setText(e.target.value);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      dispatch(clearList());
      dispatch(fetchSearchText({ searchText: text, page: 1 }));

      console.log("search");
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <div className="h-24 p-5 flex justify-between items-center rounded-10 bg-cyan-400 shadow-xl shadow-slate-600">
      <input
        className="rounded-xl h-4 w-80 flex items-center p-5 shadow-gray-600 shadow-md"
        type="search"
        value={text}
        placeholder="Search"
        onChange={handleSearch}
      />

      <div className="flex items-center justify-between gap-10 text-lg mr-20 w-50%">
        <p>Home</p>
        <p>Trending</p>
        <p>TV Shows</p>
        <p>Movies</p>
        <p>LogOut</p>
      </div>
    </div>
  );
};
