import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { Result } from "src/types/tmdb";
import { useMemo, useCallback } from "react";
import { useWatchLater } from "src/contexts/watchLater";

interface WatchLaterProps {
  movie: Result;
}

const WatchLater: React.FC<WatchLaterProps> = ({ movie }) => {
  const { addOnWatchLater, removeFromWatchLater, myList } = useWatchLater();

  const alreadyInList = useMemo(() => {
    const index = myList?.findIndex((v: Result) => v.id === movie.id);
    return index === -1 ? false : true;
  }, [myList, movie]);

  const handleList = useCallback(
    (action) => {
      switch (action) {
        case "add":
          addOnWatchLater(movie);
          break;
        case "remove":
          removeFromWatchLater(movie);
          break;

        default:
          break;
      }
    },
    [movie, removeFromWatchLater, addOnWatchLater]
  );

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

export default WatchLater;
