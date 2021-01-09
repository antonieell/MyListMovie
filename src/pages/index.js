import Head from "next/head";
import Search from "../components/Search";
import PopularMovies from "../components/PopularMovies";
import HOCPrivateRoute from "src/HOC/PrivateRoute";
import { Layout } from "../components/Layout/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="mx-auto max-w-screen-xl">
          <HOCPrivateRoute>
            <Search />
            <PopularMovies />
          </HOCPrivateRoute>
        </main>
      </Layout>
    </>
  );
}
