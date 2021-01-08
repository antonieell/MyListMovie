import Head from "next/head";
import MovieList from '../components/MovieList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MovieList/>
      </main>
    </>
  );
}
