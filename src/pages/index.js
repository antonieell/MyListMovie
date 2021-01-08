import Head from "next/head";
import PopularMovies from "../components/PopularMovies";
import HOCPrivateRoute from "src/HOC/PrivateRoute";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HOCPrivateRoute>
          <PopularMovies />
        </HOCPrivateRoute>
      </main>
    </>
  );
}
