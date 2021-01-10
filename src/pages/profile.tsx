import Head from "next/head";
import HOCPrivateRoute from "src/HOC/PrivateRoute";
import {
  Container,
  ProfileCard,
  PopUpCreateNewProfile,
  CreateNewProfile,
} from "src/components/ProfilePage";
import { useState } from "react";

const profiles = [
  { name: "rafaela" },
  { name: "marcos" },
  { name: "rafael2a" },
];

export default function Home() {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HOCPrivateRoute>
        <Container>
          <ProfileCard profiles={profiles} />
          {isPopUpOpen && <PopUpCreateNewProfile {...{ setPopUpOpen }} />}
          {profiles.length < 4 && <CreateNewProfile {...{ setPopUpOpen }} />}
        </Container>
      </HOCPrivateRoute>
    </>
  );
}
