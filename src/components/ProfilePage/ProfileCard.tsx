import { useProfile } from "src/contexts/profiles";
import { CreateNewProfile } from "src/components/ProfilePage";

interface ProfileCardProps {
  setPopUpOpen: (x: boolean) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ setPopUpOpen }) => {
  const { allProfiles } = useProfile();
  return (
    <>
      {allProfiles.map((profile, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center flex-shrink-0 w-1/4 h-32 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 md:h-64 transform scale-90"
        >
          <span className="text-xl font-extrabold md:text-4xl">
            {profile.name}
          </span>
        </div>
      ))}
      {allProfiles.length < 4 && <CreateNewProfile {...{ setPopUpOpen }} />}
    </>
  );
};
