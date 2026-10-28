import { useState } from "react";
// import ConfirmDistribution from "./ConfirmDistribution";
import ConfirmDistribution from "./ConfirmDistribution";
// import { TbBrandDatabricks } from "react-icons/tb";

const DialogPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <button
        onClick={() => setOpen(true)}
        className="bg-[#3A5CFF] flex w-full sm:w-auto h-12 px-4 justify-center items-center rounded-[15px] border border-slate-200/30 gap-2 hover:bg-[#2E4AE0] transition cursor-pointer"
      >
        <TbBrandDatabricks className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-sm md:text-base font-sans font-medium">
          Bulk Distribution
        </span>
      </button> */}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-[#0B1D21] p-6 rounded-2xl w-full max-w-6xl relative">
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <ConfirmDistribution />
          </div>
        </div>
      )}
    </>
  );
};

export default DialogPage;
