import Head from "next/head";
import {
  Container,
  ProfileCard,
  PopUpCreateNewProfile,
} from "src/components/ProfilePage";
import { useEffect, useState } from "react";
import { setLocalStorage } from "src/utils/localStorage";
import HOCPrivateRoute from "src/HOC/PrivateRoute";
import { useProfile } from "src/contexts/profiles";
import { getUserProfile } from "src/lib/db";
import { useAuth } from "src/lib/auth";

export default function Home() {
  // Toggle popup to create new profile
  const [toggleToUpdate, setToggleToUpdate] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const { setMyList } = useProfile();
  const [allProfiles, setAllProfiles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Reset currentProfile from localStorage
    setLocalStorage("currentProfile", null);
    setMyList([]);
    // fetch All profiles
    (async () => {
      if (user) {
        const resp = await getUserProfile(user.uid);
        setAllProfiles(resp);
      }
    })();
  }, [setMyList, setAllProfiles, user, toggleToUpdate]);

  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HOCPrivateRoute>
        <Container>
          <ProfileCard {...{ setPopUpOpen, allProfiles }} />
          {isPopUpOpen && (
            <PopUpCreateNewProfile {...{ setPopUpOpen, setToggleToUpdate }} />
          )}
        </Container>
      </HOCPrivateRoute>
    </>
  );
}
