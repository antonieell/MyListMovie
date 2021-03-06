import { useState, useCallback } from "react";
import { useProfile } from "src/contexts/profiles";
import { useAuth } from "src/lib/auth";
import { setUserProfile } from "src/lib/db";

interface PopUpCreateNewProfileProps {
  setPopUpOpen: (x: boolean) => void;
  setToggleToUpdate: any;
}

export const PopUpCreateNewProfile: React.FC<PopUpCreateNewProfileProps> = ({
  setPopUpOpen,
  setToggleToUpdate,
}) => {
  const { user } = useAuth();
  const [profileName, setProfileName] = useState("");

  const createNewProfile = useCallback(async () => {
    // Persist new profile
    await setUserProfile(user.uid, profileName);
    // Upedate profile list
    setToggleToUpdate((prev) => !prev);
    setPopUpOpen(false);
  }, [user, profileName, setPopUpOpen, setToggleToUpdate]);

  return (
    <div className="absolute inset-0 z-10 grid place-items-center">
      <span
        className="absolute inset-0 "
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        onClick={() => setPopUpOpen(false)}
      />
      <div className="relative z-30 flex flex-col justify-between w-4/5 h-64 p-4 mx-auto bg-white rounded-lg max-w-screen-sm">
        <h1 className="text-4xl font-extrabold">Criar novo Perfil</h1>
        <fieldset>
          <label className="font-extrabold">Nome</label>
          <input
            type="text"
            placeholder="Qual nome do perfil ?"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            autoComplete="profile"
            className="w-full h-8 py-6 pl-2 text-2xl border border-gray-400 rounded"
          />
        </fieldset>
        <div className="flex max-w-lg gap-4">
          <button
            onClick={() => setPopUpOpen(false)}
            className="flex-grow px-4 py-2 font-bold border border-black rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() => createNewProfile()}
            className="flex-grow px-4 py-2 font-bold text-white bg-black rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
