import { Result } from "src/types/tmdb";
import Image from "next/image";
import WatchLater from "../WatchLater";

interface MovieCard {
  value: Result;
}

const MovieCard = ({ value }: MovieCard) => {
  return (
    <div
      className="relative w-full mx-auto bg-blue-900 radius-sm rounded-xl hover:opacity-95 hover:bg-gray-800"
      style={{ maxWidth: "500px" }}
    >
      <WatchLater movie={value} />
      <Image
        width={342}
        height={513}
        layout="responsive"
        className="object-cover object-center w-full h-full rounded-xl"
        src={`https://image.tmdb.org/t/p/w342/${value.poster_path}`}
        alt={`${value.original_title}`}
      />
      <div className="p-2 ">
        <p className="overflow-hidden text-center overflow-ellipsis whitespace-nowrap">
          {value.original_title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
