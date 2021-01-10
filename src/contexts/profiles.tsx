import { createContext, useEffect, useState, useContext } from "react";
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
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const resp = await getUserProfile(user.uid);
        setAllProfiles(resp.data().profileAccounts);
      }
    };
    fetchUserProfile();
  }, [user]);


  return {
    allProfiles,
  };
}

