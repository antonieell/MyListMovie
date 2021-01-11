import "../styles/globals.css";
import { AuthProvider } from "../lib/auth";
import { ProfileProvider } from "src/contexts/profiles";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProfileProvider>
          <Component {...pageProps} />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default MyApp;
