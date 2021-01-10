import { Result } from "src/types/tmdb";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { useCallback } from "react";

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

interface WatchLaterProps {
  alreadyInList?: boolean;
  movie: Result;
}
const WatchLater: React.FC<WatchLaterProps> = ({
  alreadyInList = false,
  movie,
}) => {
  const handleList = useCallback((action) => {
    switch (action) {
      case "add":
        console.log("add", movie);
        break;
      case "remove":
        console.log("remove", movie);
        break;

      default:
        break;
    }
  }, []);

  if (alreadyInList) {
    return (
      <button
        title="Remover da sua lista"
        className="absolute z-20 p-2 rounded-sm top-2 right-2"
        onClick={() => handleList("remove")}
      >
        <AiOutlineCheck
          size={32}
          color="#08ff08"
          className="bg-gray-900 hover:bg-gray-500"
        />
      </button>
    );
  }
  return (
    <button
      title="Adicionar à sua lista"
      className="absolute z-20 p-2 rounded-sm top-2 right-2"
      onClick={() => handleList("add")}
    >
      <AiOutlinePlus size={32} className="bg-gray-900 hover:bg-gray-500" />
    </button>
  );
};

export default MovieCard;
