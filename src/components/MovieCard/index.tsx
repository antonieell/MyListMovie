import { Result } from "src/types/tmdb";

interface MovieCard {
  value: Result;
}

const MovieCard = ({ value }: MovieCard) => {
  return (
    <div
      className="w-full mx-auto bg-blue-900 radius-sm hover:bg-gray-800"
      style={{ maxWidth: "500px" }}
    >
      <img src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`} />
      <div className="p-2 ">
        <p className="overflow-hidden text-center overflow-ellipsis whitespace-nowrap">
          {value.original_title}
        </p>
      </div>
    </div>
  );
};
export default MovieCard;
