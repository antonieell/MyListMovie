import Head from "next/head";
import PopularMovies from "../components/PopularMovies";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        < PopularMovies/>
      </main>
    </>
  );
}
