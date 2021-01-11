import firebase from "./firebase";
import { createContext, useState, useContext } from "react";
import { createUser } from "./db";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";

const authContext = createContext<any | null>(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(getLocalStorage("user"));

  const handleUser = (rawUser, data = {}) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, data);
      setUser(user);
      setLocalStorage("user", user);
      return user;
    } else {
      setUser(false);
      setLocalStorage("user", null);
      return false;
    }
  };

  const signinWithFacebook = () => {
    const user = firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(({ user }) => {
        const formatedUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        };
        createUser(user.uid, formatedUser);
        setUser(formatedUser);
        setLocalStorage("user", user);
      });
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const formatedUser = formatUser(user);
    setUser(formatedUser);
    setLocalStorage("user", formatedUser);
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
    await firebase.auth().signOut();
    handleUser(false);
    setLocalStorage("currentProfile", null);
    return;
  };

  return {
    user,
    signout,
    createUserWithEmailAndPassword,
    signinWithFacebook,
    loginWithEmailAndPassword,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
  };
};
