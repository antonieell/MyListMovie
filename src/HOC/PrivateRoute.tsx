import { useAuth } from "src/lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HOCPrivateRoute: React.FC = ({ children }) => {
  useAuthVerify();
  return <>{children}</>;
};

const useAuthVerify = () => {
  const { user } = useAuth();
  const route = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("Você não pode acessar essa rota pois não está logado");
      route.push("/login");

      return;
    }
  }, [route, user]);
};

export default HOCPrivateRoute;
