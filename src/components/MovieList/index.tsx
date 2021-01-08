import { useCallback, useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=653b1e2db7a22d84a9a8e10903d1d7dc`
      );
      const { results } = await response.json();
      setMovies(results);
    };
    getMovies();
  }, []);
  return (
    <section className="p-4 grid grid-cols-1">
      {movies.map((value: any) => (
        <Item value={value} />
      ))}
    </section>
  );
};

const Item = ({ value }: any) => {
  return <div>{value.original_title}</div>;
};
export default MovieList;
