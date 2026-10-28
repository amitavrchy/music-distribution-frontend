import img from "@/assets/photo/ss.png";
import { BrandMark } from "@/components/BrandMark";
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";


// =================================================================
// 1. DATA AND INTERFACES (Simulated Imports/Definitions)
// =================================================================

const articleImage = img;

interface Article {
  id: string;
  image: string;
  title: string;
  link: string;
  sourceName: string;
}

const featuredArticles: Article[] = [
  {
    id: "1",
    image: articleImage,
    title:
      "Independent releases are finding their audience earlier",
    link: "#",
    sourceName: "24 Hip-Hop",
  },
  {
    id: "2",
    image: articleImage,
    title: "Future Sounds: The Evolution of Electronic Dance Music (Card 2)",
    link: "#",
    sourceName: "The Beat Reporter",
  },
  {
    id: "3",
    image: articleImage,
    title: "The Silent Revolution: Lo-Fi's Impact on Modern Music (Card 3)",
    link: "#",
    sourceName: "Indie Vibes Magazine",
  },
  {
    id: "4",
    image: articleImage,
    title: "Mastering the Mix: Insights from a Veteran Producer (Card 4)",
    link: "#",
    sourceName: "Studio Secrets",
  },
];

// =================================================================
// 2. ARTICLE CARD COMPONENT
// =================================================================

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-gray-800 w-full">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Half - Article Screenshot */}
        <div className="w-full md:w-1/2 bg-gray-900 overflow-hidden relative min-h-[150px] md:min-h-0 cursor-pointer">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover cursor-pointer"
          />
          {/* Green gradient overlay on the left side of the image (as seen in the design) */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-transparent"></div>
        </div>

        {/* Right Half - Text Content */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between cursor-pointer">
          <div>
            <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-4">
              {article.title}
            </h3>
            <a
              href={article.link}
              className="inline-flex items-center text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 text-sm gap-1"
            >
              View Full Article
              {/* call made icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </a>
          </div>

          {/* Source Logo and Name */}
          <div className="mt-6 flex items-center justify-end">
            <span className="text-gray-500 text-sm mr-2">
              {article.sourceName}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[#1a140f] text-xs text-[#f3e2c4]">
              {article.sourceName.slice(0, 1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 3. MAIN SECTION COMPONENT (CAROUSEL)
// =================================================================

const FeaturedArticlesSection: React.FC = () => {
  return (
    <div>
      <section className="relative overflow-hidden">
        {/* Top Tag */}
        <motion.div
          // variants={textItemVariants}
          className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 bg-[#0C1C1F] rounded-3xl w-[250px] md:w-[330px] h-[52px] mx-auto border-t border-[#075D2F]"
        >
          <Link
            to="/"
            className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 "
          >
            <BrandMark size={36} />
          </Link>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 font-light tracking-[0.25em] uppercase">
            Featured Articles
          </p>
        </motion.div>
        {/* Background Gradients (Matches the dark green overlay) - Simplified for dark theme */}
        <div className="absolute inset-0  z-0 opacity-50"></div>

        <div className="relative w-full mx-auto z-10">
          {/* Articles Wrapper - Swiper Carousel */}
          <div className="relative group">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                  slidesPerGroup: 1,
                },
              }}
              className="featured-articles-swiper"
            >
              {featuredArticles.map((article, index) => (
                <SwiperSlide key={article.id} className="py-2 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 flex mt-20 items-center justify-between w-full pointer-events-none px-4 md:px-8 z-20">
              {/* Left Arrow */}
              <button
                className="swiper-button-prev-custom pointer-events-auto cursor-pointer bg-gray-800/70 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 -ml-4"
                aria-label="Previous Article"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Right Arrow */}
              <button
                className="swiper-button-next-custom pointer-events-auto cursor-pointer bg-gray-800/70 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 -mr-4"
                aria-label="Next Article"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedArticlesSection;
