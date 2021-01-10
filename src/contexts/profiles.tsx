import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useAuth } from "src/lib/auth";
import { getUserProfile } from "src/lib/db";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";

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
  const [allProfiles, setAllProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(
    getLocalStorage("currentProfile")
  );
  const { user } = useAuth();

  const setStorageCurrentProfile = useCallback((data) => {
    setCurrentProfile(data);
    setLocalStorage("currentProfile", data);
  }, []);

  const fetchUserProfile = useCallback(async () => {
    if (user) {
      const resp = await getUserProfile(user.uid);
      setAllProfiles(resp);
    }
  }, [user]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    allProfiles,
    fetchUserProfile,
    setStorageCurrentProfile,
    currentProfile
  };
}
