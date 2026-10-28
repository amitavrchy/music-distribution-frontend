// components/CustomButton.tsx
import { Button } from "../ui/button";
import React from "react";

interface CustomButtonProps {
  label: string;
  variant?: "default" | "outline";
  onClick?: () => void;
  className?: string;
}

const ReuseButton: React.FC<CustomButtonProps> = ({
  label,
  variant = "default",
  onClick,
  className = "",
}) => {
  const baseStyles =
    "w-full md:w-[180px] h-[56px] px-8 py-4 flex justify-center items-center gap-[10px] text-lg rounded-[8px] transition duration-300 cursor-pointer";

  const defaultStyles = "bg-primary-orange text-white hover:bg-orange-600";
  const outlineStyles =
    "border border-[#B2DDFF] text-[#194185] hover:bg-[#E6F4FF] hover:border-[#194185]";

  const combinedStyles =
    baseStyles +
    " " +
    (variant === "outline" ? outlineStyles : defaultStyles) +
    " " +
    className;

  return (
    <Button className={combinedStyles} variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ReuseButton;
