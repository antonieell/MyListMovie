import Head from "next/head";
import MyListComponent from "src/components/MyList/";
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
          </HOCPrivateRoute>
        </main>
      </Layout>
    </>
  );
}
