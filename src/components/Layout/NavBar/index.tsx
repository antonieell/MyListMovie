import { useAuth } from "src/lib/auth";
import Link from "next/link";

export const NavBar: React.FC = () => {
  const { signout, user } = useAuth();
  return (
    <header className="absolute inset-0 h-12 px-4 text-black bg-gray-100 shadow">
      <nav className="relative flex items-center justify-between h-full px-4 mx-auto max-w-screen-xl">
        <Link href="/">
          <a>
            <h1 className="font-extrabold">My List</h1>
          </a>
        </Link>
        {user ? (
          <NavAuthenticated {...{ signout }} />
        ) : (
          <NavWhitoutAuthentication />
        )}
      </nav>
    </header>
  );
};

const NavWhitoutAuthentication = () => {
  return (
    <div className="flex space-x-4">
      <Link href="/login">
        <a href="/register">Login</a>
      </Link>

      <Link href="/register">
        <a href="/register">Cadastro</a>
      </Link>
    </div>
  );
};

interface NavAuthenticatedProps {
  signout: () => void;
}
const NavAuthenticated = ({ signout }: NavAuthenticatedProps) => {
  return (
    <div className="flex space-x-4">
      <Link href="/profile">
        <a>Meu Perfil</a>
      </Link>
      <Link href="/mylist">
        <a>Minhas Listas</a>
      </Link>
      <button onClick={signout}>Logout</button>
    </div>
  );
};
