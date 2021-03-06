import { useProfile } from "src/contexts/profiles";
import { CreateNewProfile } from "src/components/ProfilePage";
import { useCallback } from "react";
import { useRouter } from "next/router";

interface ProfileCardProps {
  setPopUpOpen: (x: boolean) => void;
  allProfiles: any[];
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  setPopUpOpen,
  allProfiles,
}) => {
  const { setStorageCurrentProfile } = useProfile();
  const router = useRouter();

  // Callback to onClick pick the Profile
  const selectProfile = useCallback(
    (data) => {
      setStorageCurrentProfile(data);
      router.push("/");
    },
    [setStorageCurrentProfile, router]
  );

  return (
    <>
      {allProfiles.map((profile, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center flex-shrink-0 w-1/4 h-32 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 md:h-64 transform scale-90"
          onClick={() => selectProfile(profile)}
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
