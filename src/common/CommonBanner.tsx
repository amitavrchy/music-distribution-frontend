interface ICommonBannerProp {
  title: string;
  route: string;
  bgImage: string;
}

const CommonBanner = ({ title, route, bgImage }: ICommonBannerProp) => {
  return (
    <div className="relative h-64 md:h-[550px] w-full bg-contain bg-center bg-no-repeat">
      <img
        src={bgImage}
        alt="bannerBg"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-[40px] md:text-5xl font-bold mb-3">{title}</h1>
        <p className="text-sm md:text-lg text-gray-200">{route}</p>
      </div>
    </div>
  );
};

export default CommonBanner;
