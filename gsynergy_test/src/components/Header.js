import { useState } from "react";

export const Header = () => {
  const [text, setText] = useState("");
  const handleSearch = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="header">
      <input
        type="search"
        value={text}
        placeholder="Search"
        onChange={handleSearch}
      />

      <div className="header-list">
        <p>Home</p>
        <p>Trending</p>
        <p>TV Shows</p>
        <p>Movies</p>
        <p>LogOut</p>
      </div>
    </div>
  );
};
