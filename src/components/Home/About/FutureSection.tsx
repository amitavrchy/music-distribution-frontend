import gifIcon from "@/assets/gif.gif";

const FutureSection = () => {
  return (
    <div className="bg-black/50 py-16 md:py-24 relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px] animate-pulse top-[20%] left-[10%]"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-400/15 rounded-full blur-[150px] animate-pulse animation-delay-2000 bottom-[20%] right-[15%]"></div>
      </div> */}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <button className=" border border-white/20 text-white px-6 py-3 rounded-full font-medium font-montserrat text-base leading-[130%] hover:border-green-400 transition-colors flex items-center gap-2 mx-auto cursor-pointer">
            <img
              src={gifIcon}
              alt="The Future is Bright Icon"
              className="w-8 h-8 aspect-square object-contain"
            />
            The Future is Bright
          </button>
        </div>

        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[100%] text-center uppercase font-montserrat"
          style={{
            WebkitTextStroke: "1px #F2F2F2",
          }}
        >
          The future of the music industry looks promising, especially with
          Marlow leading the way. We empower independent artists and aim to
          reshape success for creators worldwide.
        </h2>
      </div>
    </div>
  );
};

export default FutureSection;
