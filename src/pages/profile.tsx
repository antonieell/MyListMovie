import Head from "next/head";
import HOCPrivateRoute from "src/HOC/PrivateRoute";

const profiles = [
  { name: "rafaela" },
  { name: "marcos" },
  { name: "rafaela" },
  { name: "marcos" },
];
export default function Home() {
  return (
    <>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HOCPrivateRoute>
        <main className="w-full min-h-screen px-4 bg-gray-800 gap-4">
          <div className="items-center justify-center min-h-screen text-black place-content-center grid grid-cols-2 auto-cols-auto md:grid-cols-4">
            {profiles.map((v) => (
              <ProfileCard key={v.name} profile={v} />
            ))}
          </div>
        </main>
      </HOCPrivateRoute>
    </>
  );
}

interface ProfileCardProps {
  profile: { name: string };
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="flex items-center justify-center flex-shrink-0 w-full h-32 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 md:h-64 transform scale-90">
      <span className="text-4xl font-extrabold">{profile.name}</span>
    </div>
  );
};
