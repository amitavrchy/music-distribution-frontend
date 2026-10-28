import { FaAnglesLeft } from "react-icons/fa6";
import { FormDataType } from "./MultiStepForm";
import { FaAngleDoubleRight } from "react-icons/fa";

type StepTwoProps = {
  formData: FormDataType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
};

//   const [formData, setFormData] = useState({
//     publisher: "",
//     copyrightHolder: "",
//     language: "English",
//     explicit: "No",
//     producer: "",
//     lyricist: "",
//     masterSplits: "",
//     territory: "",
//     externalSplits: "No",
//     territories: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

const StepTwo = ({ handleChange, nextStep, prevStep }: StepTwoProps) => {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="text-3xl font-sans">
          Music-Specific & Legal Information
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          This section covers the copyright, credits, and legal details of your
          release.
        </p>
      </div>
      <div className=" flex items-center justify-center px-4">
        <div className="w-full  text-gray-200">
          <h2 className="text-2xl font-bold mb-6">Release Information</h2>

          <form className="space-y-6">
            {/* Publisher */}
            <div>
              <label className="block text-sm mb-2">Publisher</label>
              <input
                type="text"
                name="publisher"
                //value={formData.publisher || ""}
                onChange={handleChange}
                placeholder="Enter release title"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Copyright Holder */}
            <div>
              <label className="block text-sm mb-2">Copyright Holder</label>
              <input
                type="text"
                name="copyrightHolder"
                //value={formData.copyrightHolder || ""}
                onChange={handleChange}
                placeholder="Enter release title"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm mb-2">Language</label>
              <select
                name="language"
                //value={formData.language || ""}
                onChange={handleChange}
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
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

            {/* Producer Credits */}
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

            {/* Lyricist Credits */}
            <div>
              <label className="block text-sm mb-2">Lyricist Credits</label>
              <input
                type="text"
                name="lyricist"
                //value={formData.lyricist || ""}
                onChange={handleChange}
                placeholder="Artist or Brand Name"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Master Splits */}
            <div>
              <label className="block text-sm mb-2">Master Splits</label>
              <input
                type="text"
                name="masterSplits"
                //value={formData.masterSplits || ""}
                onChange={handleChange}
                placeholder="Artist or Brand Name"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Territory */}
            <div>
              <label className="block text-sm mb-2">
                Please list territory of where the release was recorded
              </label>
              <input
                type="text"
                name="territory"
                //value={formData.territory || ""}
                onChange={handleChange}
                placeholder="Artist or Brand Name"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* External Splits */}
            <div>
              <label className="block text-sm mb-2">
                Did your master splits include a split to an artist or company
                not signed to Create?
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="externalSplits"
                    value="Yes"
                    //checked={formData.externalSplits === "Yes"}
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="externalSplits"
                    value="No"
                    //checked={formData.externalSplits === "No"}
                    onChange={handleChange}
                    className="text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Territories */}
            <div>
              <label className="block text-sm mb-2">Territories</label>
              <input
                type="text"
                name="territories"
                //   //value={formData.territories || ""}
                onChange={handleChange}
                placeholder="Enter territories"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
