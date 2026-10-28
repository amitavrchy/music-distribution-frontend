import { FaAnglesLeft } from "react-icons/fa6";
import { FormDataType } from "./MultiStepForm";
import { FaAngleDoubleRight } from "react-icons/fa";

type StepThreeProps = {
  formData: FormDataType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const StepThree = ({
  formData,
  handleChange,
  prevStep,
  nextStep,
}: StepThreeProps) => {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="text-3xl font-sans">Additional & Partner Details</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Please provide any extra information for special distribution and
          promotion.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-sans mb-4">Content & Promotion</h2>
        <div className="space-y-6">
          {/* Explicit Content */}
          <div>
            <label className="block text-sm mb-2">
              Does this track contain explicit content?
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit1"
                  value="Yes"
                  checked={formData.explicit === "Yes"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="No"
                  checked={formData.explicit === "No"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                No
              </label>
            </div>
          </div>
          {/* 2 */}
          {/* Explicit Content */}
          <div>
            <label className="block text-sm mb-2">
              Does this track contain explicit content?
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="Yes"
                  //checked={formData.explicit === "Yes"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="No"
                  //checked={formData.explicit === "No"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                No
              </label>
            </div>
          </div>

          {/* Example input for another field, e.g., "promotion" */}
          <div className="grid w-full gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-200"
            >
              Your message
            </label>
            <textarea
              id="message"
              placeholder="Type your message here..."
              className="w-full min-h-[120px] rounded-xl border border-gray-600 bg-[#213430] px-4 py-3 text-sm text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
            />
          </div>

          {/* Explicit Content */}
          <div>
            <label className="block text-sm mb-2">
              Does this track contain explicit content?
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="Yes"
                  //checked={formData.explicit === "Yes"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="No"
                  //checked={formData.explicit === "No"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                No
              </label>
            </div>
          </div>
          {/* 4 */}
          <div>
            <label className="block text-sm mb-2">Producer Credits</label>
            <input
              type="text"
              name="producer"
              value={formData.producer || ""}
              onChange={handleChange}
              placeholder="Artist or Brand Name"
              className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 5 */}
          <div>
            <label className="block text-sm mb-2">Producer Credits</label>
            <input
              type="text"
              name="producer"
              //value={formData.producer || ""}
              onChange={handleChange}
              placeholder="Artist or Brand Name"
              className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* 6 */}

          {/* Explicit Content */}
          <div>
            <label className="block text-sm mb-2">
              Does this track contain explicit content?
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="Yes"
                  //checked={formData.explicit === "Yes"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="explicit"
                  value="No"
                  //checked={formData.explicit === "No"}
                  onChange={handleChange}
                  className="text-blue-500 focus:ring-0 cursor-pointer"
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-2 rounded-xl 
             bg-gray-600 text-white font-medium shadow-md 
             hover:bg-gray-700 hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-gray-400 
             transition-all duration-200 cursor-pointer"
          >
            <FaAnglesLeft className="text-lg" />
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2 text-white font-medium bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 cursor-pointer"
          >
            Next
            <FaAngleDoubleRight className="text-lg" />
          </button>

          {/* <button
            type="submit"
            className="px-6 py-2 bg-green-600 rounded-xl hover:bg-green-700 cursor-pointer"
          >
            Submit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default StepThree;
