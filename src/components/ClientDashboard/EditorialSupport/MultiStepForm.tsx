import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

// import StepFour from "./StepFour";

export type FormDataType = {
  producer: string;
  explicit: string;
  name: string;
  email: string;
  phone: string;
  artistName: string;
  location: string;
  releaseDate: string;
  preOrderDate: string;
  label: string;
  albumArtist: string;
  releaseTitle: string;
  releaseType: string;
  genre: string;
  artwork: File | null;
  musicFile: string;
  tiktokClip: File | null;
  // StepTwo fields
  publisher: string;
  copyrightHolder: string;
  language: string;
  lyricist: string;
  masterSplits: string;
  territory: string;
  externalSplits: string;
  territories: string;
  // StepFour fields
  songTitle: string;
  iswc: string;
  releaseDateSplit: string;
  recordingArtists: string;
  recordLabel: string;
  recordLabelFull: string;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    producer: "",
    explicit: "",
    name: "",
    email: "",
    phone: "",
    artistName: "",
    location: "",
    releaseDate: "",
    preOrderDate: "",
    label: "",
    albumArtist: "",
    releaseTitle: "",
    releaseType: "",
    genre: "",
    artwork: null,
    musicFile: "",
    tiktokClip: null,
    // Add fields for StepTwo
    publisher: "",
    copyrightHolder: "",
    language: "",
    lyricist: "",
    masterSplits: "",
    territory: "",
    externalSplits: "",
    territories: "",
    // Add fields for StepFour
    songTitle: "",
    iswc: "",
    releaseDateSplit: "",
    recordingArtists: "",
    recordLabel: "",
    recordLabelFull: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Final Form Data:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="w-full mt-4">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        <div
          className={`h-2 flex-1 rounded-full mr-2 ${
            step >= 1
              ? "bg-gradient-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full mr-2 ${
            step >= 2
              ? "bg-gradient-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full mr-2 ${
            step >= 3
              ? "bg-gradient-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full ${
            step >= 4
              ? "bg-gradient-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        {/* <div
      className={`h-2 flex-1 rounded-full ${
        step >= 4 ? "bg-gradient-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]" : "bg-gray-600"
      }`}
    /> */}
      </div>

      {/* Steps */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <StepOne
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <StepFour
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
          />
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
