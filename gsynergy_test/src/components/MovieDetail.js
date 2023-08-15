import { useEffect } from "react";

export const MovieDetail = () => {
  useEffect(() => {
    fetchDetail();
  }, []);
  const fetchDetail = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/api_key=${api_key}`
    );
    const dataJ = await data.json();
    console.log(dataJ, "DATA");
    setList(dataJ.results); //storing that data in the state
  };
  return (
    <div className="movie-detail">
      <div>
        <img src="" alt="poster" />
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
};
