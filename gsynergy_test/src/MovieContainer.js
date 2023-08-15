import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { api_key } from "./constants";
import { Link } from "react-router-dom";

export const MovieContainer = () => {
  const [list, setList]= useState([])
  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`);
    const dataJ = await data.json();
    console.log(dataJ,"DATA")
    setList(dataJ.results); //storing that data in the state
  };
 
  return <div className="container">
    {list.length===0?<p>Loading</p>:list?.filter(movie=>movie.media_type=="movie" && movie.original_language=="en").map((movie)=>(
      <Link to={`/detail/${movie.id}`} style={{textDecoration:"none"}}><MovieCard data={movie} /></Link>
    ))}
  </div>;
};
