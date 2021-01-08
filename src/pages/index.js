import Head from "next/head";
import Search from "../components/Search";
import PopularMovies from "../components/PopularMovies";
import HOCPrivateRoute from "src/HOC/PrivateRoute";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-screen-xl">
        <HOCPrivateRoute>
          <Search />
          <PopularMovies />
        </HOCPrivateRoute>
      </main>
    </>
  );
}
