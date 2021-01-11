import { useAuth } from "src/lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfile } from "src/contexts/profiles";

const HOCPrivateRoute: React.FC = ({ children }) => {
  useAuthVerify();
  return <>{children}</>;
};

const useAuthVerify = () => {
  const { user } = useAuth();
  const { currentProfile } = useProfile();
  const route = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("Você não pode acessar essa rota pois não está logado");
      route.push("/login");

      return;
    }
    if (!currentProfile && route.pathname !== "/profile") {
      console.log("Você não pode acessar essa rota pois não está logado");
      route.push("/profile");

      return;
    }
  }, [route, user, currentProfile]);
};

export default HOCPrivateRoute;
