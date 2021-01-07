export const NavBar: React.FC = () => {
  //TODO
  const isAuthenticated = false;
  return (
    <header className="absolute inset-0 h-12 px-4 text-black bg-gray-100 shadow">
      <nav className="relative flex items-center justify-between h-full px-4 mx-auto max-w-screen-xl">
        <h1 className="font-extrabold">My List</h1>
        {isAuthenticated ? <NavAuthenticated /> : <NavWhitoutAuthentication />}
      </nav>
    </header>
  );
};

const NavWhitoutAuthentication = () => {
  return (
    <div className="flex space-x-4">
      <a>Login</a>
      <a>Cadastro</a>
    </div>
  );
};

const NavAuthenticated = () => {
  return (
    <div className="flex space-x-4">
      <a>Meu Perfil</a>
      <a>Minhas Listas</a>
    </div>
  );
};
