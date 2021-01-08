import { NavBar } from "./NavBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen pt-12 text-white bg-gray-200">
      <NavBar />
      {children}
    </div>
  );
};
