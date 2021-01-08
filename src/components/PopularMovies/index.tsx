import { useEffect, useState } from "react";
import { Result } from "src/types/tmdb";
import MovieCard from "../MovieCard";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=653b1e2db7a22d84a9a8e10903d1d7dc`
      );
      const { results }: { results: Result[] } = await response.json();
      setMovies(results);
    };
    getMovies();
  }, []);
  return (
    <section className="content-center p-4 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 overflow-x">
      <h2 className="text-4xl font-black text-black col-span-full">
        Filmes em Alta
      </h2>
      {movies.map((value: Result) => (
        <MovieCard key={value.id} value={value} />
      ))}
    </section>
  );
};

export default PopularMovies;
