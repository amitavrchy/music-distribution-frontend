import { useEffect, useRef, useState } from "react";
import brand from "../../../assets/brand.png";
import education from "../../../assets/education.png";
import marketing from "../../../assets/marketing.png";

const SupportSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const supportFeatures = [
    { icon: brand, title: "Brand Development" },
    { icon: education, title: "Educational Workshops" },
    { icon: marketing, title: "Marketing & PR Assistance" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            supportFeatures.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200); // 200ms delay between each card
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-black/50 py-16 md:py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-[40px] font-sans text-white/20 mb-6 sm:mb-8 text-start">
          <span className="text-white">COMPREHENSIVE ARTIST SUPPORT</span>
        </h2>

        <p className="text-gray-400 text-base ">
          Our dedicated team is here to support you at every stage of your
          career. We offer personalized guidance, workshops, and resources to
          help you navigate the complexities of the music industry.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-start">
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              className={`w-full max-w-[320px] transition-all duration-700 ease-out ${
                visibleCards[index]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              } hover:scale-105`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
                />
                <h3
                  className="text-[#F2F2F2] font-medium leading-[130%]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "130%",
                  }}
                >
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
