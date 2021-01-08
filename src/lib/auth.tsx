import firebase from "./firebase";
import { createContext, useState, useEffect, useContext } from "react";
import { createUser } from "./db";

const authContext = createContext<any | null>(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return handleUser(user);
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  return {
    user,
    signout,
    createUserWithEmailAndPassword,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
  };
};
