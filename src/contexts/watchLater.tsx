import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useAuth } from "src/lib/auth";
import { updateWishList } from "src/lib/db";
import { Result } from "src/types/tmdb";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";
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

const initMyList = () => {
  const profile = getLocalStorage("currentProfile");
  if (profile) {
    return profile.wishList;
  }
  return [];
};

export const useWatchLaterProvider = () => {
  const { user } = useAuth();
  const { currentProfile } = useProfile();
  const [myList, setMyList] = useState<Array<Result>>(initMyList());

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

  const persistInLocalStorage = useCallback(() => {
    const newStorage = { ...currentProfile, wishList: myList };
    //Persist in localStorage
    setLocalStorage("currentProfile", newStorage);
  }, [myList, currentProfile]);

  const persistInFirestore = useCallback(async () => {
    //Persist in firestore
    await updateWishList(user, currentProfile, myList);
  }, [user, myList, currentProfile]);

  useEffect(() => {
    persistInLocalStorage();
    persistInFirestore();
  }, [myList, persistInFirestore, persistInLocalStorage]);

  return {
    myList,
    addOnWatchLater,
    removeFromWatchLater,
  };
};
