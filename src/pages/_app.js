import "../styles/globals.css";
import { Layout } from "../components/Layout/index";
import { AuthProvider } from "../lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
