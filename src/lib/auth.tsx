import firebase from "./firebase";
import { createContext, useState, useContext } from "react";
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

  const handleUser = (rawUser, data = {}) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, data);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const formatedUser = formatUser(user);
    setUser(formatedUser);
    return formatedUser;
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
    data: any
  ) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return handleUser(user, data);
  };

  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  return {
    user,
    signout,
    createUserWithEmailAndPassword,
    loginWithEmailAndPassword,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
  };
};
