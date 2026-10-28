import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Songwriter = {
  songwriterName: string;
  songwriterContribution: string;
  songwriterAddress: string;
  songwriterContact: string;
  songwriterPublisher: string;
  songwriterAffiliation: string;
  songwriterIPI: string;
  songwriterSplit: string;
};

const EditorialPitchForm = () => {
  const navigate = useNavigate();

  // Add this at the top of your component
  const [songwriters, setSongwriters] = useState<Songwriter[]>([
    {
      songwriterName: "",
      songwriterContribution: "",
      songwriterAddress: "",
      songwriterContact: "",
      songwriterPublisher: "",
      songwriterAffiliation: "",
      songwriterIPI: "",
      songwriterSplit: "",
    },
  ]);

  // Handler to update a specific songwriter
  const handleSongwriterChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const newSongwriters = [...songwriters];

    // Tell TypeScript that 'name' is a key of Songwriter
    newSongwriters[index][name as keyof Songwriter] = value;

    setSongwriters(newSongwriters);
  };

  // Handler to add a new songwriter
  const addSongwriter = () => {
    setSongwriters([
      ...songwriters,
      {
        songwriterName: "",
        songwriterContribution: "",
        songwriterAddress: "",
        songwriterContact: "",
        songwriterPublisher: "",
        songwriterAffiliation: "",
        songwriterIPI: "",
        songwriterSplit: "",
      },
    ]);
  };

  /* Form Data   */
  const [formData, setFormData] = useState({
    artistName: "",
    artistEmail: "",
    songTitle: "",
    recordingArtists: "",
    releaseDate: "",
    theme: "",
    mood: "",
    comparableArtists: "",
    description: "",
    creativeStory: "",
    uniqueInstrumentation: "No",
    producer: "",
    mixEngineer: "",
    masteringEngineer: "",
    songProducers: "",
    studioName: "",
    dateRecorded: "",
    productionNotes: "",
    videoDirector: "",
    iswc: "",
    tiktokFollowers: "",
    spotifyListeners: "",
    targetMarkets: "",
    targetAudience: "",
    mainPlatform: "",
    releaseSchedule: "",
    pressPhotosLink: "",
    pressPackLink: "",
    appleMusicStats: "",
    spotifyPitch: "No",
    songwriterName: "",
    songwriterContribution: "",
    songwriterAddress: "",
    songwriterContact: "",
    songwriterPublisher: "",
    songwriterAffiliation: "",
    songwriterIPI: "",
    songwriterSplit: "",
    additionalNotes: "",
    referralName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="mx-auto bg-[#0C1F21] rounded-xl border border-[#2C403E] p-6 shadow-xl text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 bg-[#3A5CFF] hover:bg-blue-600 transition-colors px-5 py-2 rounded-lg shadow-md cursor-pointer"
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Editorial Support Sheet
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Please provide all necessary information for release coordination and
          playlist pitching.
        </p>

        {/* I. General & Contact */}
        <section>
          <h2 className="text-2xl font-sans mb-4">General & Contact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                Artist/Manager Name *
              </label>
              <input
                name="artistName"
                placeholder="Full Name"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.artistName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Artist Email *</label>
              <input
                name="artistEmail"
                placeholder="Email"
                type="email"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.artistEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Song Title *</label>
              <input
                name="songTitle"
                placeholder="Song Title"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.songTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Recording Artist(s) *
              </label>
              <input
                name="recordingArtists"
                placeholder="Recording Artist(s)"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.recordingArtists}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Release Date *</label>
              <input
                name="releaseDate"
                placeholder="Release Date"
                type="date"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* II. Creative & Storytelling */}
        <section>
          <h2 className="text-2xl font-sans mb-4">Creative & Storytelling</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">
                What is the main theme of this song/album? *
              </label>
              <textarea
                name="theme"
                placeholder="Theme"
                rows={3}
                className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                value={formData.theme}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">
                  What mood/vibe does this song create? *
                </label>
                <input
                  name="mood"
                  placeholder="Mood/Vibe"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.mood}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Who are some comparable artists/songs? (Provide 3) *
                </label>
                <input
                  name="comparableArtists"
                  placeholder="Comparable Artists/Songs"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.comparableArtists}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">
                Release/Song description (Inspiration) *
              </label>
              <textarea
                name="description"
                placeholder="Description"
                rows={4}
                className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Is there a unique story about the creative process?
              </label>
              <textarea
                name="creativeStory"
                placeholder="Creative Story"
                rows={3}
                className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                value={formData.creativeStory}
                onChange={handleChange}
              />
            </div>

            {/* Unique Instrumentation */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 sm:mb-0">
                  Does this song have any unique instrumentation?
                </label>
                <span className="block text-xs mt-2 text-gray-300">
                  If yes, please mention it in the description above
                </span>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="uniqueInstrumentation"
                    value="Yes"
                    checked={formData.uniqueInstrumentation === "Yes"}
                    onChange={() =>
                      handleRadioChange("uniqueInstrumentation", "Yes")
                    }
                    className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">Yes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="uniqueInstrumentation"
                    value="No"
                    checked={formData.uniqueInstrumentation === "No"}
                    onChange={() =>
                      handleRadioChange("uniqueInstrumentation", "No")
                    }
                    className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* <div className="space-y-5">
              <div>
                <label className="block text-sm mb-2 sm:mb-0">
                  Does this song have any unique instrumentation?
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <button
                  type="button"
                  onClick={() =>
                    handleRadioChange("uniqueInstrumentation", "Yes")
                  }
                  className={`cursor-pointer w-full md:w-1/2 px-4 py-2 rounded-lg border transition-all ${
                    formData.uniqueInstrumentation === "Yes"
                      ? "bg-[#3A5CFF] text-white border-[#3A5CFF]"
                      : "bg-transparent text-white border-gray-500 hover:border-[#3A5CFF]"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleRadioChange("uniqueInstrumentation", "No")
                  }
                  className={`cursor-pointer w-full md:w-1/2 px-4 py-2 rounded-lg border transition-all ${
                    formData.uniqueInstrumentation === "No"
                      ? "bg-[#3A5CFF] text-white border-[#3A5CFF]"
                      : "bg-transparent text-white border-gray-500 hover:border-[#3A5CFF]"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <span className="block text-xs mt-2 text-gray-300">
              If yes, please mention it in the description above
            </span> */}
          </div>
        </section>

        {/* III. Technical & Production */}
        <section>
          <h2 className="text-2xl font-sans mb-4">Technical & Production</h2>
          <div className=" space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2"> Producer *</label>
                <input
                  name="producer"
                  placeholder="Producer"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.producer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2"> Mix Engineer</label>
                <input
                  name="mixEngineer"
                  placeholder="Mix Engineer"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.mixEngineer}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Mastering Engineer</label>
                <input
                  name="masteringEngineer"
                  placeholder="Mastering Engineer"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.masteringEngineer}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Song Producer(s)</label>
                <input
                  name="songProducers"
                  placeholder="Song Producer(s)"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.songProducers}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Studio Name</label>
                <input
                  name="studioName"
                  placeholder="Studio Name"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.studioName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2"> Date Recorded</label>
                <input
                  name="dateRecorded"
                  placeholder="Date Recorded"
                  type="date"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.dateRecorded}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">
                Noteworthy info about production
              </label>
              <textarea
                name="productionNotes"
                placeholder="Noteworthy info about production"
                rows={3}
                className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                value={formData.productionNotes}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2"> Video Director</label>
              <input
                name="videoDirector"
                placeholder="Video Director"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.videoDirector}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">ISWC No</label>
              <input
                name="iswc"
                placeholder="ISWC No"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.iswc}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* IV. Marketing & Promotion */}
        <section>
          <h2 className="text-2xl font-sans mb-4">Marketing & Promotion</h2>
          <div className=" space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">TikTok Followers *</label>
                <input
                  name="tiktokFollowers"
                  placeholder="TikTok Followers"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.tiktokFollowers}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Spotify Monthly Listeners *
                </label>
                <input
                  name="spotifyListeners"
                  placeholder="Spotify Monthly Listeners"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.spotifyListeners}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Targeted Ex-US markets
                </label>
                <input
                  name="targetMarkets"
                  placeholder="Targeted Ex-US markets"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.targetMarkets}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Most important social media platform
                </label>
                <input
                  name="mainPlatform"
                  placeholder="Main Platform"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.mainPlatform}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/*  */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Describe your target audience *
                </label>
                <textarea
                  name="targetAudience"
                  placeholder="Target Audience"
                  rows={3}
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Upcoming release schedule
                </label>
                <textarea
                  name="releaseSchedule"
                  placeholder="Release Schedule"
                  rows={3}
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                  value={formData.releaseSchedule}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Press photos link *
                </label>
                <input
                  name="pressPhotosLink"
                  type="url"
                  placeholder="https://..."
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.pressPhotosLink}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Press pack/EPK link
                </label>
                <input
                  name="pressPackLink"
                  type="url"
                  placeholder="https://..."
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={formData.pressPackLink}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Apple Music & iTunes stats
                </label>
                <textarea
                  name="appleMusicStats"
                  placeholder="Apple Music & iTunes stats"
                  rows={3}
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                  value={formData.appleMusicStats}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Spotify Pitch */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Will the artist submit a Spotify For Artists pitch?
                </label>
                <p className="text-xs text-gray-300 mt-1">
                  Release date must be at least 3 weeks out to be considered.
                </p>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="spotifyPitch"
                    value="Yes"
                    checked={formData.spotifyPitch === "Yes"}
                    onChange={() => handleRadioChange("spotifyPitch", "Yes")}
                    className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">Yes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="spotifyPitch"
                    value="No"
                    checked={formData.spotifyPitch === "No"}
                    onChange={() => handleRadioChange("spotifyPitch", "No")}
                    className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* <div className="space-y-5">
              <div>
                <label className="block text-sm mb-2 sm:mb-0">
                  Will artist submit a Spotify For Artists pitch?
                </label>
                <span className="block text-xs mt-2 text-gray-300">
                  Release date must be at least 3 weeks out to be considered.
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <button
                  type="button"
                  onClick={() => handleRadioChange("spotifyPitch", "Yes")}
                  className={`cursor-pointer w-full md:w-1/2 px-4 py-2 rounded-lg border transition-all ${
                    formData.spotifyPitch === "Yes"
                      ? "bg-[#3A5CFF] text-white border-[#3A5CFF]"
                      : "bg-transparent text-white border-gray-500 hover:border-[#3A5CFF]"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleRadioChange("spotifyPitch", "No")}
                  className={`cursor-pointer w-full md:w-1/2 px-4 py-2 rounded-lg border transition-all ${
                    formData.spotifyPitch === "No"
                      ? "bg-[#3A5CFF] text-white border-[#3A5CFF]"
                      : "bg-transparent text-white border-gray-500 hover:border-[#3A5CFF]"
                  }`}
                >
                  No
                </button>
              </div>
            </div> */}
          </div>
        </section>

        {/* V. Songwriter Information */}

        <section>
          <h2 className="text-2xl font-sans mb-4">
            Songwriter Information (Split Sheet)
          </h2>

          <p className="text-gray-400 mb-4">
            This is critical for publishing and royalty tracking. Total
            percentage split must equal 100%.
          </p>

          {songwriters.map((writer, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-xl border-[#2C403E] mb-4"
            >
              <div>
                <label className="block text-sm mb-2">Name *</label>
                <input
                  name="songwriterName"
                  placeholder="Songwriter Name"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterName}
                  onChange={(e) => handleSongwriterChange(index, e)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Contribution *</label>
                <input
                  name="songwriterContribution"
                  placeholder="e.g., Lyrics, Melody"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterContribution}
                  onChange={(e) => handleSongwriterChange(index, e)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Address</label>
                <input
                  name="songwriterAddress"
                  placeholder="Songwriter Address"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterAddress}
                  onChange={(e) => handleSongwriterChange(index, e)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone/Email</label>
                <input
                  name="songwriterContact"
                  placeholder="Phone or Email"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterContact}
                  onChange={(e) => handleSongwriterChange(index, e)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Publisher</label>
                <input
                  name="songwriterPublisher"
                  placeholder="Songwriter Publisher"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterPublisher}
                  onChange={(e) => handleSongwriterChange(index, e)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Affiliation (PRO)</label>
                <input
                  name="songwriterAffiliation"
                  placeholder="e.g., ASCAP, BMI"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterAffiliation}
                  onChange={(e) => handleSongwriterChange(index, e)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">IPI/CAE Number</label>
                <input
                  name="songwriterIPI"
                  placeholder="Songwriter IPI/CAE Number"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterIPI}
                  onChange={(e) => handleSongwriterChange(index, e)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Percentage Split (%) *
                </label>
                <input
                  name="songwriterSplit"
                  type="number"
                  placeholder="e.g., 50"
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                  value={writer.songwriterSplit}
                  onChange={(e) => handleSongwriterChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSongwriter}
            className="cursor-pointer mt-4 bg-[#3A5CFF] hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-xl"
          >
            + Add Another Songwriter
          </button>
        </section>

        {/* VI. Final Notes & Referral */}
        <section>
          <h2 className="text-2xl font-sans mb-4">Final Notes & Referral</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">
                Anything else you'd like us to know?
              </label>
              <textarea
                name="additionalNotes"
                placeholder="Additional Notes"
                rows={3}
                className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
                value={formData.additionalNotes}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Please enter the name of the person who sent you this form /
                your A&R at Marlow *
              </label>
              <input
                name="referralName"
                placeholder="Referral Name"
                className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                value={formData.referralName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-[#3A5CFF] hover:bg-blue-600 transition-colors text-white px-8 py-3 rounded-xl shadow-lg font-semibold cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditorialPitchForm;
