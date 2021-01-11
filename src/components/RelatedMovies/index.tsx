import { useEffect, useMemo, useState } from "react";
import { useProfile } from "src/contexts/profiles";
import { Result } from "src/types/tmdb";
import MovieCard from "../MovieCard";

const RelatedMovies = () => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const { myList }: { myList: Result[] } = useProfile();

  const genersId = useMemo(() => {
    const genersId = myList.reduce(
      (acc, value) => [...acc, ...value.genre_ids],
      []
    );
    const frequency = {};
    let max = null;
    let mostAppearsGenerId = null;
    genersId.forEach((v) => {
      frequency[v] = (frequency[v] || 0) + 1;
      if (frequency[v] > max) {
        max = frequency[v];
        mostAppearsGenerId = v;
      }
    });
    return mostAppearsGenerId;
  }, [myList]);

  useEffect(() => {
    if (genersId) {
      (async () => {
        const resp = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genersId}&sort_by=popularity.desc`
        );
        const data = await resp.json();
        if (resp.ok) {
          setRelatedMovies(data.results);
        }
      })();
    }
  }, [genersId]);

  return (
    <section className="content-center p-4 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x">
      <h2 className="text-4xl font-black text-black col-span-full">
        Filmes recomendados
      </h2>
      {relatedMovies.map((value: Result) => (
        <MovieCard key={value.id} value={value} />
      ))}
    </section>
  );
};

export default RelatedMovies;
