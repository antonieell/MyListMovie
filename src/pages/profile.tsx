import Head from "next/head";
import {
  Container,
  ProfileCard,
  PopUpCreateNewProfile,
} from "src/components/ProfilePage";
import { useEffect, useState } from "react";
import { setLocalStorage } from "src/utils/localStorage";
import HOCPrivateRoute from "src/HOC/PrivateRoute";

export default function Home() {
  // Toggle popup to create new profile
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  useEffect(() => {
    // Reset currentProfile from localStorage
    setLocalStorage("currentProfile", null);
  });

  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HOCPrivateRoute>
        <Container>
          <ProfileCard {...{ setPopUpOpen }} />
          {isPopUpOpen && <PopUpCreateNewProfile {...{ setPopUpOpen }} />}
        </Container>
      </HOCPrivateRoute>
    </>
  );
}
