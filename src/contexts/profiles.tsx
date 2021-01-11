import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "src/lib/auth";
import { updateWishList } from "src/lib/db";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";
import { Result } from "src/types/tmdb";

const profileContext = createContext<any | null>(null);

export function ProfileProvider({ children }) {
  const profile = useProviderProfile();
  return (
    <profileContext.Provider value={profile}>
      {children}
    </profileContext.Provider>
  );
}

export const useProfile = () => {
  return useContext(profileContext);
};

function useProviderProfile() {
  const { user } = useAuth();
  const [myList, setMyList] = useState<Array<Result>>([]);
  const [currentProfile, setCurrentProfile] = useState(
    getLocalStorage("currentProfile")
  );

  useEffect(() => {
    if (currentProfile) {
      setMyList(currentProfile.wishList);
    }
  }, [currentProfile]);

  const setStorageCurrentProfile = useCallback((data) => {
    setCurrentProfile(data);
    setLocalStorage("currentProfile", data);
    setMyList(data.wishList);
  }, []);

  const persistInFirestore = useCallback(
    async (data) => {
      //Persist in firestore
      await updateWishList(user, currentProfile, data);
    },
    [user, currentProfile]
  );

  const addOnWatchLater = useCallback(
    (movie: Result) => {
      const newList = [...myList, movie];
      setMyList(newList);
      persistInFirestore(newList);
    },
    [myList, persistInFirestore]
  );

  const removeFromWatchLater = useCallback(
    (movie: Result) => {
      const indexId = [...myList].findIndex(
        (value: Result) => value.id === movie.id
      );
      const modifyList = [...myList];
      modifyList.splice(indexId, 1);
      setMyList(modifyList);
      persistInFirestore(modifyList);
    },
    [myList, persistInFirestore]
  );

  return {
    setStorageCurrentProfile,
    currentProfile,
    myList,
    addOnWatchLater,
    removeFromWatchLater,
    setMyList,
  };
}
