export const Container: React.FC = ({ children }) => {
  return (
    <main className="relative w-full min-h-screen px-4 bg-gray-800 gap-4">
      <div className="flex items-center justify-center min-h-screen text-black">
        {children}
      </div>
    </main>
  );
};

