import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { Result } from "src/types/tmdb";
import { setLocalStorage } from "src/utils/localStorage";
import { useProfile } from "./profiles";

const watchLaterContext = createContext<any | null>(null);

export function WatchLaterProvider({ children }) {
  const watchLater = useWatchLaterProvider();
  return (
    <watchLaterContext.Provider value={watchLater}>
      {children}
    </watchLaterContext.Provider>
  );
}

export const useWatchLater = () => {
  return useContext(watchLaterContext);
};

export const useWatchLaterProvider = () => {
  const { currentProfile } = useProfile();
  const [myList, setMyList] = useState<Array<Result>>([]);

  const addOnWatchLater = useCallback((movie: Result) => {
    setMyList((previuous) => [...previuous, movie]);
  }, []);

  const removeFromWatchLater = (movie: Result) => {
    const indexId = [...myList].findIndex(
      (value: Result) => value.id === movie.id
    );
    const modifyList = [...myList];
    modifyList.splice(indexId, 1);
    setMyList(modifyList);
  };

  useEffect(() => {
    const newStorage = { ...currentProfile, wishList: myList };
    setLocalStorage("currentProfile", newStorage);
  }, [myList, currentProfile]);

  return {
    myList,
    addOnWatchLater,
    removeFromWatchLater,
  };
};
