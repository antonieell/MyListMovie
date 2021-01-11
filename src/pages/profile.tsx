import Head from "next/head";
import {
  Container,
  ProfileCard,
  PopUpCreateNewProfile,
} from "src/components/ProfilePage";
import { useEffect, useState } from "react";
import { useAuth } from "src/lib/auth";
import { useRouter } from "next/router";
import { setLocalStorage } from "src/utils/localStorage";

export default function Home() {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setLocalStorage("currentProfile", null);
    if (!user) {
      console.log("Você precisa estar logado para escolher um perfil");
      router.push("/login");
    }
  });

  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ProfileCard {...{ setPopUpOpen }} />
        {isPopUpOpen && <PopUpCreateNewProfile {...{ setPopUpOpen }} />}
      </Container>
    </>
  );
}
