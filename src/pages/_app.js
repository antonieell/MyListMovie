import "../styles/globals.css";
import { AuthProvider } from "../lib/auth";
import { ProfileProvider } from "src/contexts/profiles";
import { WatchLaterProvider } from "src/contexts/watchLater.tsx";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <WatchLaterProvider>
          <Component {...pageProps} />
        </WatchLaterProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default MyApp;
