import { useProfile } from "src/contexts/profiles";
import { Result } from "src/types/tmdb";
import MovieCard from "../MovieCard";

const MyList = () => {
  const { myList } = useProfile();
  return (
    <section className="content-center p-4 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x">
      <h2 className="text-4xl font-black text-black col-span-full">
        Sua Lista
      </h2>
      {myList.map((value: Result) => (
        <MovieCard key={value.id} value={value} />
      ))}
    </section>
  );
};

export default MyList;
