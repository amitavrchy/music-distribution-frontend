/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import usa from "../../../assets/usa.png";
import austrilia from "../../../assets/austrilia.png";
import canada from "../../../assets/canada.png";
import newZealand from "../../../assets/new.png";
import germany from "../../../assets/germany.png";
import fu from "../../../assets/fu.png";
import echoes from "../../../assets/Echoes.png";
import vibrant from "../../../assets/Vibrent.png";
import bro from "../../../assets/bro.png";
import bro2 from "../../../assets/bro2.png";
import bro3 from "../../../assets/bro3.png";
import bro4 from "../../../assets/bro4.png";
import bro5 from "../../../assets/bro5.png";

const TechnologySection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
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

  const cardData = [
    {
      title: "Top Countries",
      badge: "Geo Trends",
      items: [
        { country: "United States", flag: usa, amount: "$8.18 USD" },
        { country: "Australia", flag: austrilia, amount: "$0.12 USD" },
        { country: "Canada", flag: canada, amount: "$0.05 USD" },
        { country: "New Zealand", flag: newZealand, amount: "$0.03 USD" },
        { country: "Germany", flag: germany, amount: "$0.03 USD" },
      ],
    },
    {
      title: "Top US Regions",
      badge: "Geo Trends",
      items: [
        { region: "Ohio", views: "250", icon: fu },
        { region: "Michigan", views: "300", icon: fu },
        { region: "California", views: "450", icon: fu },
        { region: "Maryland", views: "600", icon: fu },
        { region: "New York", views: "700", icon: fu },
      ],
    },
    {
      title: "Top Assets",
      badge: "Assets",
      items: [
        {
          name: "Sisters in Harmony 2023 (Official Music Video)",
          amount: "$8.00 USD",
          icon: echoes,
        },
        { name: "Vibrant Beats", amount: "$0.09 USD", icon: vibrant },
        {
          name: "Echoes of the Night (Live Show)",
          amount: "$0.08 USD",
          icon: echoes,
        },
        {
          name: "Chasing Shadows (Official Rooftop Session)",
          amount: "$0.06 USD",
          icon: echoes,
        },
        { name: "YEAH YEAH!", amount: "$0.03 USD", icon: echoes },
      ],
    },
    {
      title: "Top Claims",
      badge: "Claims",
      items: [
        {
          name: "Brothers in Harmony 2023 (Official Cypher)",
          amount: "$8.00 USD",
          icon: bro,
        },
        {
          name: "Lunar Echo - Vibe Check 5v5 Beat crafted by DJ",
          amount: "$0.09 USD",
          icon: bro2,
        },
        {
          name: "Lunar Lila - Heart Ablaze (Live Showcase)",
          amount: "$0.08 USD",
          icon: bro3,
        },
        {
          name: "Celestial Lunar- Discovered My Rhythm | Official",
          amount: "$0.06 USD",
          icon: bro4,
        },
        {
          name: "Celestail Chachi Let's Jam!",
          amount: "$0.03 USD",
          icon: bro5,
        },
      ],
    },
  ];

  return (
    <div className="bg-black/50 py-16 md:py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-sans text-white/20 mb-6 sm:mb-8 text-start">
          <span className="text-white">HARNESSING TECHNOLOGY FOR YOU</span>
        </h2>

        <p className="text-gray-400 text-base  mx-auto  text-start">
          We leverage cutting-edge technology to provide you with the best tools
          to create, manage, and promote your music. From analytics dashboards
          to AI-powered marketing tools, we have you covered.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-10 p-10 bg-[#0C181E] rounded-2xl border border-[#323D43]">
          {cardData.map((card, cardIndex) => (
            <div
              key={cardIndex}
              className={`bg-linear-to-br from-[#0C1A1F] to-[#0C1A1F] p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-700 ease-out ${
                visibleCards[cardIndex]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {card.title}
                </h3>
                <span className="text-green-400 text-xs sm:text-sm">
                  {card.badge}
                </span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {card.items.map((item: any, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 sm:py-3 hover:bg-gray-700/50 px-3 sm:px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="text-gray-300 flex items-center gap-2 sm:gap-3 flex-1 min-w-0 text-sm sm:text-base">
                      <img
                        src={item.flag || item.icon}
                        alt={item.country || item.region || item.name}
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                      />
                      <span className="truncate">
                        {item.country || item.region || item.name}
                      </span>
                    </span>
                    <span className="text-white font-semibold text-sm sm:text-base whitespace-nowrap ml-2">
                      {item.amount || item.views}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologySection;
