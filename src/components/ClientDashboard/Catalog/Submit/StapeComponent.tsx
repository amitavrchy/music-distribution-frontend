import backicon from "@/assets/icons/backIcon.png";
import cross from "@/assets/icons/cross.png";
import MultiStepForm from "./MultiStepForm";
import { Link } from "react-router-dom";

const StapeComponent = () => {
  return (
    <div className="relative ">
      {/* Left Top Icon */}
      <Link to="/client-dashboard/catalog/submit">
        <img
          src={backicon}
          className="h-6 w-6 absolute top-4 left-4"
          alt="Back Left"
        />
      </Link>

      {/* Main Form */}
      <div className="w-[98%] md:w-[80%] 2xl:w-[85%] mx-auto py-10 ">
        <MultiStepForm />
      </div>

      {/* Right Top Icon */}
      <Link to="/client-dashboard/catalog/submit">
        <img
          src={cross}
          className="h-6 w-6 absolute top-4 right-4"
          alt="Back Right"
        />
      </Link>
    </div>
  );
};

export default StapeComponent;
