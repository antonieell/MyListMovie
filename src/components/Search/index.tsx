import { useCallback, useState } from "react";
import { Result } from "src/types/tmdb";
import MovieCard from "../MovieCard";

const Search = () => {
  const [movies, setMovies] = useState([]);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      if (query.length === 0) {
        setMovies([]);
        return;
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
      );
      const { results }: { results: Result[] } = await response.json();
      setMovies(results);
    },
    []
  );

  return (
    <div className="content-center p-4 ">
      <input
        type="text"
        className="w-full py-2 text-3xl text-gray-900 bg-transparent border-b border-gray-400 col-span-full "
        placeholder="Pesquise por filmes"
        onChange={onChange}
      />
      {movies.length !== 0 && (
        <section className="content-center gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x">
          {movies.map((value: Result) => (
            <MovieCard key={value.id} value={value} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Search;
