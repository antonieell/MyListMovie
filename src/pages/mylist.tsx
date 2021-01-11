import Head from "next/head";
import MyListComponent from "src/components/MyList/";
import RelatedMovies from "src/components/RelatedMovies";
import HOCPrivateRoute from "src/HOC/PrivateRoute";
import { Layout } from "../components/Layout/index";

export default function MyList() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="mx-auto max-w-screen-xl">
          <HOCPrivateRoute>
            <MyListComponent />
            <RelatedMovies />
          </HOCPrivateRoute>
        </main>
      </Layout>
    </>
  );
}
