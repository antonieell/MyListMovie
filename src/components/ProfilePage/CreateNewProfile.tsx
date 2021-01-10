import { AiOutlinePlus } from "react-icons/ai";

interface CreateNewProfileProps {
  setPopUpOpen: (x: boolean) => void;
}
export const CreateNewProfile: React.FC<CreateNewProfileProps> = ({
  setPopUpOpen,
}) => {
  return (
    <div
      onClick={() =>setPopUpOpen(true)}
      className="flex items-center justify-center flex-shrink-0 w-1/4 h-32 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 md:h-64 transform scale-90"
    >
      <AiOutlinePlus size={40} color="black" />
    </div>
  );
};

