import Head from "next/head";
import HOCPrivateRoute from "src/HOC/PrivateRoute";
import {
  Container,
  ProfileCard,
  PopUpCreateNewProfile,
} from "src/components/ProfilePage";
import { useState } from "react";

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
          <ProfileCard {...{ setPopUpOpen }} />
          {isPopUpOpen && <PopUpCreateNewProfile {...{ setPopUpOpen }} />}
        </Container>
      </HOCPrivateRoute>
    </>
  );
}
