interface CommonButtonProps {
  btnTitle: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CommonButton = ({
  btnTitle,
  onClick,
  type = "button",
}: CommonButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full bg-primary-orange text-white py-2 px-6 md:px-8 md:py-3 rounded-[8px] hover:bg-orange-600 cursor-pointer"
    >
      {btnTitle}
    </button>
  );
};

export default CommonButton;
