import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

// Import images (adjust paths as needed)
import pic1 from "@/assets/pic1.png";
import pic2 from "@/assets/pic2.png";
import pic3 from "@/assets/pic3.png";
import pic4 from "@/assets/pic4.png";
import pic5 from "@/assets/pic5.png";
import pic6 from "@/assets/pic6.png";
import pic7 from "@/assets/pic7.png";
import pic8 from "@/assets/pic8.png";
import pic9 from "@/assets/pic9.png";
import pic10 from "@/assets/pic10.png";
import pic11 from "@/assets/pic11.png";
import pic12 from "@/assets/pic12.png";
import { Link } from "react-router-dom";

interface Article {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string;
  category: string;
}

const NewsArticles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "Marlow Distribution: Redefining the Rhythm of Tomorrow's Hits",
      date: "25 Oct, 2025",
      image: pic1,
      category: "Music Industry",
      content: `At OneiSlone Entertainment, we are passionate storytellers committed to crafting unforgettable experiences that resonate with audiences worldwide. Our mission is to empower artists and innovators to celebrate the art of storytelling and imagination.

We believe in nurturing talent and providing a platform where creativity thrives. Through our innovative approach to entertainment, we've built a community that celebrates diversity, originality, and the power of music to transform lives.

Our artists are at the heart of everything we do. We provide them with the resources, support, and freedom to create authentic content that connects with fans on a deeper level. From production to distribution, we handle every aspect with care and professionalism.

Technology plays a crucial role in our operations. We leverage cutting-edge tools and platforms to ensure our content reaches audiences across the globe. Our digital-first strategy has enabled us to build strong connections with fans in every corner of the world.

Looking ahead, we remain committed to pushing boundaries and exploring new frontiers in entertainment. The future is bright, and we're excited to continue this journey with our artists, partners, and fans.`,
    },
    {
      id: 2,
      title: "Breaking Barriers: The New Wave of Independent Artists",
      date: "25 Oct, 2025",
      image: pic2,
      category: "Artist Spotlight",
      content: `The music industry is witnessing a revolutionary shift as independent artists gain unprecedented access to global audiences. OneiSlone Entertainment stands at the forefront of this movement, championing creators who dare to be different.

Gone are the days when artists needed major label backing to reach millions. Today's technology has democratized music production and distribution, allowing talented individuals to share their art directly with fans.

Our platform provides independent artists with professional-grade resources that were once available only to signed acts. From state-of-the-art recording facilities to marketing expertise, we ensure every artist has the tools needed to succeed.

The response from the community has been overwhelming. Artists appreciate the creative freedom and fair compensation model we offer, while fans enjoy discovering fresh, authentic voices that challenge mainstream conventions.

Success stories abound in our roster. Many artists who started with us as unknowns have gone on to achieve chart-topping success while maintaining their artistic integrity and vision.`,
    },
    {
      id: 3,
      title: "The Future of Music Production: Innovation Meets Creativity",
      date: "25 Oct, 2025",
      image: pic3,
      category: "Technology",
      content: `Innovation drives everything we do at OneiSlone Entertainment. Our investment in cutting-edge production technology has transformed how music is created, mixed, and mastered in the modern era.

Our studios feature the latest equipment and software, enabling artists to experiment with sounds and techniques that were impossible just a few years ago. The fusion of traditional musicianship with digital innovation creates unique sonic landscapes.

Collaboration is easier than ever before. Artists can work together across continents, sharing ideas and building tracks in real-time. This global approach enriches the creative process and leads to diverse, multicultural musical expressions.

Artificial intelligence and machine learning are opening new possibilities in music creation. While we embrace these tools, we ensure they enhance rather than replace human creativity and emotional expression.

The next generation of music will be shaped by those who can balance technological prowess with artistic vision. We're committed to being leaders in this exciting new frontier of entertainment.`,
    },
    {
      id: 4,
      title: "Community and Connection: Building Bridges Through Music",
      date: "25 Oct, 2025",
      image: pic4,
      category: "Community",
      content: `Music has always been a universal language that brings people together. At OneiSlone Entertainment, we've built a thriving community where artists and fans form meaningful connections that transcend geographical boundaries.

Our events and showcase programs provide platforms for emerging talent to share their work with engaged audiences. These intimate gatherings foster genuine relationships and create memorable experiences for everyone involved.

Social media integration allows fans to interact directly with their favorite artists, creating a sense of intimacy and accessibility that traditional entertainment models rarely achieved. This direct connection enhances loyalty and engagement.

We've also launched mentorship programs that pair established artists with newcomers, ensuring knowledge and expertise are passed down through generations. This collaborative spirit strengthens our entire community.

The power of music to heal, inspire, and unite has never been more evident. As we continue growing, we remain dedicated to nurturing this special community that celebrates creativity and connection.`,
    },
    {
      id: 5,
      title: "Sustainability in Entertainment: Our Green Initiative",
      date: "25 Oct, 2025",
      image: pic5,
      category: "Sustainability",
      content: `OneiSlone Entertainment recognizes the responsibility we have toward the environment. Our green initiative represents a comprehensive approach to reducing our carbon footprint while maintaining excellence in entertainment production.

From solar-powered studios to digital-first distribution strategies, we've reimagined every aspect of our operations through an environmental lens. These changes have significantly reduced waste and energy consumption.

Our artists are enthusiastic partners in this mission. Many have incorporated sustainability themes into their work, using their platforms to raise awareness about climate change and environmental conservation.

The shift to streaming and digital formats has eliminated the need for physical media production, drastically cutting down on plastic waste and transportation emissions. We continue exploring new ways to minimize our environmental impact.

Looking forward, sustainability will remain a core value guiding our business decisions. We believe entertainment can be both impactful and environmentally responsible, setting an example for the entire industry.`,
    },
    {
      id: 6,
      title: "Global Sounds: Celebrating Cultural Diversity in Music",
      date: "25 Oct, 2025",
      image: pic6,
      category: "Culture",
      content: `The beauty of music lies in its diversity. OneiSlone Entertainment proudly showcases artists from every corner of the globe, celebrating the rich tapestry of cultural expressions that make our world vibrant and interesting.

Traditional instruments meet modern production techniques in our studios, creating fusion genres that honor heritage while pushing creative boundaries. This cultural exchange enriches both artists and audiences.

We've partnered with cultural organizations worldwide to ensure authentic representation and respectful collaboration. These partnerships help us understand and appreciate the deep meanings behind different musical traditions.

Our international festivals bring together artists from diverse backgrounds, creating spaces where cultural exchange happens naturally through shared love of music. These events have become highlights of the entertainment calendar.

By championing diversity, we've discovered that audiences crave authentic, culturally rich content. The success of our multicultural approach proves that great music transcends language and borders.`,
    },
    {
      id: 7,
      title: "The Business of Music: Empowering Artists Financially",
      date: "25 Oct, 2025",
      image: pic7,
      category: "Business",
      content: `Fair compensation for artists has always been a priority at OneiSlone Entertainment. We've revolutionized the traditional revenue model to ensure creators receive equitable payment for their work and maintain ownership of their art.

Our transparent royalty system allows artists to track earnings in real-time, understanding exactly how their music performs across different platforms and markets. This transparency builds trust and empowers informed decision-making.

We provide financial literacy programs to help artists manage their earnings effectively, invest wisely, and build sustainable careers. Many creators struggle with the business side of entertainment, and we're here to help.

Direct-to-fan sales and exclusive content offerings have created new revenue streams that bypass traditional gatekeepers. Artists can now monetize their creativity in ways that were previously impossible.

The music industry is changing, and we're proud to lead the charge toward a more equitable system where talent is rewarded fairly and artists maintain creative and financial control over their work.`,
    },
    {
      id: 8,
      title: "Youth Development: Nurturing the Next Generation of Talent",
      date: "25 Oct, 2025",
      image: pic8,
      category: "Education",
      content: `Investing in young talent is investing in the future of entertainment. OneiSlone Entertainment's youth development programs provide aspiring artists with education, mentorship, and opportunities to develop their skills.

Our workshops cover everything from music theory and production to performance and business management. Young participants gain comprehensive knowledge that prepares them for successful careers in entertainment.

Scholarship programs ensure talented individuals from all economic backgrounds have access to quality training. We believe financial circumstances should never limit someone's ability to pursue their artistic dreams.

Partnerships with schools and community centers extend our reach, bringing music education to underserved areas. These programs have discovered incredible talent that might otherwise have gone unnoticed.

Many of today's rising stars got their start in our youth programs. Watching them grow and succeed brings immense satisfaction and confirms the importance of investing in the next generation.`,
    },
    {
      id: 9,
      title: "Virtual Reality and Music: The Next Frontier",
      date: "25 Oct, 2025",
      image: pic9,
      category: "Innovation",
      content: `Virtual reality is transforming how audiences experience music. OneiSlone Entertainment has pioneered immersive VR concerts that transport fans into incredible virtual environments where they can enjoy performances from anywhere in the world.

Our VR experiences go beyond simple 360-degree video. We create interactive worlds where fans can explore, socialize, and engage with music in revolutionary ways. The technology enables unprecedented intimacy with artists.

Artists love the creative possibilities VR offers. They can design impossible stage sets, defy physics, and create visual experiences that complement their music perfectly. The only limit is imagination.

Accessibility is a major benefit of VR concerts. Fans with mobility issues or those living in remote areas can attend shows that would otherwise be impossible. Music truly becomes available to everyone.

As VR technology improves and becomes more affordable, we envision a future where virtual and physical concerts coexist, each offering unique value. We're excited to be shaping this future.`,
    },
    {
      id: 10,
      title: "Mental Health Matters: Supporting Artist Wellbeing",
      date: "25 Oct, 2025",
      image: pic10,
      category: "Wellness",
      content: `The entertainment industry can be demanding and stressful. OneiSlone Entertainment prioritizes mental health support for our artists, recognizing that creative wellbeing depends on emotional and psychological health.

We provide access to licensed therapists who understand the unique challenges artists face. These confidential services help creators manage stress, overcome creative blocks, and maintain work-life balance.

Our wellness programs include meditation sessions, yoga classes, and workshops on mindfulness and stress management. Many artists have reported improved creativity and productivity after participating in these programs.

We've also created peer support groups where artists can share experiences and advice in safe, judgment-free environments. The community aspect of these groups has proven incredibly valuable.

By normalizing conversations about mental health, we hope to reduce stigma throughout the industry. Taking care of mental wellbeing isn't weakness—it's essential for sustained creative excellence.`,
    },
    {
      id: 11,
      title: "Data-Driven Decisions: Analytics in Modern Entertainment",
      date: "25 Oct, 2025",
      image: pic11,
      category: "Analytics",
      content: `Understanding audience behavior has become crucial in the digital age. OneiSlone Entertainment leverages sophisticated analytics to help artists understand their fans and make informed decisions about their careers.

Our analytics platform provides detailed insights into listener demographics, geographic distribution, engagement patterns, and playlist additions. This data helps artists identify opportunities and optimize their strategies.

Rather than replacing intuition, data enhances creative decision-making. Artists can see which songs resonate most strongly and understand why, allowing them to refine their craft while staying true to their vision.

Marketing campaigns benefit enormously from data insights. We can target specific demographics with precision, ensuring promotional resources are used effectively and reach the most receptive audiences.

The future of entertainment is data-informed but artist-led. We provide tools and insights while respecting creative autonomy, believing the best results come from balancing analytics with artistic vision.`,
    },
    {
      id: 12,
      title: "Looking Ahead: Our Vision for 2026 and Beyond",
      date: "25 Oct, 2025",
      image: pic12,
      category: "Future",
      content: `As we look toward 2026, OneiSlone Entertainment remains committed to innovation, creativity, and artist empowerment. Our vision includes expanding into new markets, developing groundbreaking technologies, and continuing to challenge industry norms.

We're investing heavily in artificial intelligence tools that will assist artists without replacing human creativity. These tools will handle mundane tasks, freeing creators to focus on what they do best—making art.

Global expansion plans will bring our platform to emerging markets where talented artists lack access to professional resources. We believe great music exists everywhere and deserves to be heard.

Partnerships with tech companies will enable us to stay at the cutting edge of entertainment technology. From blockchain-based rights management to advanced audio formats, we're exploring every innovation.

The journey ahead is exciting. With our talented artists, dedicated team, and passionate community, we're confident that OneiSlone Entertainment will continue leading the entertainment industry into a bright, creative future.`,
    },
  ];

  if (selectedArticle) {
    return (
      <>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out;
          }
        `}</style>
        <div className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 mt-8">
          {/* Back Button */}
          <div className="w-full min-w-0 py-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Articles</span>
            </button>

            {/* Article Detail */}
            <article className="fade-in">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Date */}
              <p className="text-gray-400 mb-8">{selectedArticle.date}</p>

              {/* Featured Image */}
              <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                {selectedArticle.content
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-300 mb-6 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="text-white font-semibold mb-4">
                  Share this article
                </h3>
                <div className="flex gap-4">
                  <Link to="https://x.com">
                    {" "}
                    <button className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors">
                      Twitter
                    </button>
                  </Link>
                  <Link to="https://www.facebook.com">
                    <button className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors">
                      Facebook
                    </button>
                  </Link>
                  <Link to="https://www.linkedin.com">
                    <button className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors">
                      LinkedIn
                    </button>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translate(100px, -100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-pulse-slow {
          animation: pulseSlow ease-in-out infinite;
        }

        .animate-float-up {
          animation: floatUp linear infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="min-h-screen bg-black/50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
            style={{
              top: "20%",
              left: "10%",
              background:
                "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
              animationDuration: "6s",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
            style={{
              bottom: "10%",
              right: "10%",
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
              animationDuration: "8s",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
              animationDuration: "7s",
              animationDelay: "2s",
            }}
          />

          {/* Floating Particles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400 animate-float-up"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
                animationDuration: `${15 + Math.random() * 15}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 mt-12 w-full min-w-0 py-12 text-white">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              NEWS & ARTICLES
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              At Marlow, we believe in the power of stories
              to inspire, connect, and entertain. Dive into our News & Articles
              for the latest insights, trends, and behind-the-scenes glimpses of
              the entertainment world, where every tale matters and every voice
              counts.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                {/* Image Container - Rectangle */}
                <div className="relative overflow-hidden rounded-lg mb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Read More Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold">
                        Read More
                      </span>
                    </div>
                  </div>
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-lg transition-all duration-300 pointer-events-none" />
                </div>

                {/* Content - Separate Box */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    {article.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsArticles;

// import React from "react";

// // Import images (adjust paths as needed)
// import pic1 from "@/assets/pic1.png";
// import pic2 from "@/assets/pic2.png";
// import pic3 from "@/assets/pic3.png";
// import pic4 from "@/assets/pic4.png";
// import pic5 from "@/assets/pic5.png";
// import pic6 from "@/assets/pic6.png";
// import pic7 from "@/assets/pic7.png";
// import pic8 from "@/assets/pic8.png";
// import pic9 from "@/assets/pic9.png";
// import pic10 from "@/assets/pic10.png";
// import pic11 from "@/assets/pic11.png";
// import pic12 from "@/assets/pic12.png";

// interface Article {
//   id: number;
//   title: string;
//   date: string;
//   image: string;
// }

// const NewsArticles: React.FC = () => {
//   const articles: Article[] = [
//     {
//       id: 1,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic1,
//     },
//     {
//       id: 2,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic2,
//     },
//     {
//       id: 3,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic3,
//     },
//     {
//       id: 4,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic4,
//     },
//     {
//       id: 5,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic5,
//     },
//     {
//       id: 6,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic6,
//     },
//     {
//       id: 7,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic7,
//     },
//     {
//       id: 8,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic8,
//     },
//     {
//       id: 9,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic9,
//     },
//     {
//       id: 10,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic10,
//     },
//     {
//       id: 11,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic11,
//     },
//     {
//       id: 12,
//       title:
//         "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits",
//       date: "25 Oct, 2025",
//       image: pic12,
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @keyframes pulseSlow {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 0.2;
//           }
//           50% {
//             transform: scale(1.1);
//             opacity: 0.3;
//           }
//         }

//         @keyframes gridDown {
//           0% {
//             transform: translateY(0);
//           }
//           100% {
//             transform: translateY(50px);
//           }
//         }

//         @keyframes gridRight {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(50px);
//           }
//         }

//         @keyframes floatUp {
//           0% {
//             transform: translate(0, 0) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 0.3;
//           }
//           90% {
//             opacity: 0.3;
//           }
//           100% {
//             transform: translate(100px, -100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }

//         @keyframes scanVertical {
//           0% {
//             top: -2%;
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             top: 102%;
//             opacity: 0;
//           }
//         }

//         .animate-pulse-slow {
//           animation: pulseSlow ease-in-out infinite;
//         }

//         .animate-grid-down {
//           animation: gridDown 20s linear infinite;
//         }

//         .animate-grid-right {
//           animation: gridRight 25s linear infinite;
//         }

//         .animate-float-up {
//           animation: floatUp linear infinite;
//         }

//         .animate-scan {
//           animation: scanVertical 8s ease-in-out infinite;
//         }
//       `}</style>
//       {/* Animated Background */}
//       <div className="min-h-screen bg-black/50 relative overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div
//             className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
//             style={{
//               top: "20%",
//               left: "10%",
//               background:
//                 "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
//               animationDuration: "6s",
//             }}
//           />
//           <div
//             className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
//             style={{
//               bottom: "10%",
//               right: "10%",
//               background:
//                 "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
//               animationDuration: "8s",
//               animationDelay: "1s",
//             }}
//           />
//           <div
//             className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
//             style={{
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               background:
//                 "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
//               animationDuration: "7s",
//               animationDelay: "2s",
//             }}
//           />

//           {/* Moving Grid Lines */}
//           {/* <div className="absolute inset-0 opacity-10">
//             <div
//               className="absolute inset-0 animate-grid-down"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.3) 25%, rgba(16, 185, 129, 0.3) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.3) 75%, rgba(16, 185, 129, 0.3) 76%, transparent 77%, transparent)",
//                 backgroundSize: "50px 50px",
//               }}
//             />
//             <div
//               className="absolute inset-0 animate-grid-right"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.3) 25%, rgba(16, 185, 129, 0.3) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.3) 75%, rgba(16, 185, 129, 0.3) 76%, transparent 77%, transparent)",
//                 backgroundSize: "50px 50px",
//               }}
//             />
//           </div> */}

//           {/* Floating Particles */}
//           {[...Array(25)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full bg-emerald-400 animate-float-up"
//               style={{
//                 width: `${2 + Math.random() * 3}px`,
//                 height: `${2 + Math.random() * 3}px`,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 opacity: 0.3,
//                 animationDuration: `${15 + Math.random() * 15}s`,
//                 animationDelay: `${Math.random() * 5}s`,
//               }}
//             />
//           ))}

//           {/* Scanning Lines Effect */}
//           {/* <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-scan" /> */}
//         </div>

//         {/* Content */}
//         <div className="text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 mt-20">
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
//               NEWS & ARTICLES
//             </h1>
//             <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
//               At OneiSlone Entertainment, we believe in the power of stories to
//               inspire, connect, and entertain. Dive into our News & Articles for
//               the latest insights, trends, and behind-the-scenes glimpses of the
//               entertainment world, where every tale matters and every voice
//               counts.
//             </p>
//           </div>

//           {/* Articles Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//             {articles.map((article) => (
//               <div key={article.id} className="group cursor-pointer">
//                 {/* Image Container - Rectangle */}
//                 <div className="relative overflow-hidden rounded-lg mb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
//                   <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
//                     <img
//                       src={article.image}
//                       alt={article.title}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     {/* Overlay on hover */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </div>
//                   {/* Hover Border Effect */}
//                   <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-lg transition-all duration-300 pointer-events-none" />
//                 </div>

//                 {/* Content - Separate Box */}
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">
//                     {article.title}
//                   </h3>
//                   <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
//                     {article.date}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewsArticles;

///import { useEffect, useRef, useState } from 'react';

// // Import images
// import pic1 from "@/assets/pic1.png";
// import pic2 from "@/assets/pic2.png";
// import pic3 from "@/assets/pic3.png";
// import pic4 from "@/assets/pic4.png";
// import pic5 from "@/assets/pic5.png";
// import pic6 from "@/assets/pic6.png";
// import pic7 from "@/assets/pic7.png";
// import pic8 from "@/assets/pic8.png";
// import pic9 from "@/assets/pic9.png";
// import pic10 from "@/assets/pic10.png";
// import pic11 from "@/assets/pic11.png";
// import pic12 from "@/assets/pic12.png";

// interface Article {
//   id: number;
//   title: string;
//   date: string;
//   image: string;
// }

// const NewsArticles = () => {
//   const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(12).fill(false));
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const articles: Article[] = [
//     { id: 1, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic1 },
//     { id: 2, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic2 },
//     { id: 3, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic3 },
//     { id: 4, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic4 },
//     { id: 5, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic5 },
//     { id: 6, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic6 },
//     { id: 7, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic7 },
//     { id: 8, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic8 },
//     { id: 9, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic9 },
//     { id: 10, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic10 },
//     { id: 11, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic11 },
//     { id: 12, title: "OneiSlone Entertainment: Redefining the Rhythm of Tomorrow's Hits", date: "25 Oct, 2025", image: pic12 }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             articles.forEach((_, index) => {
//               setTimeout(() => {
//                 setVisibleCards((prev) => {
//                   const newState = [...prev];
//                   newState[index] = true;
//                   return newState;
//                 });
//               }, index * 100);
//             });
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animationFrameId: number;
//     let particles: Particle[] = [];

//     const resizeCanvas = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       opacity: number;
//       canvas: HTMLCanvasElement;
//       ctx: CanvasRenderingContext2D;
//       hue: number;

//       constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
//         this.canvas = canvas;
//         this.ctx = ctx;
//         this.x = Math.random() * this.canvas.width;
//         this.y = Math.random() * this.canvas.height;
//         this.size = Math.random() * 2.5 + 1;
//         this.speedX = Math.random() * 0.6 - 0.3;
//         this.speedY = Math.random() * 0.6 - 0.3;
//         this.opacity = Math.random() * 0.5 + 0.15;
//         this.hue = Math.random() * 60 + 140; // Green to cyan range
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x > this.canvas.width) this.x = 0;
//         if (this.x < 0) this.x = this.canvas.width;
//         if (this.y > this.canvas.height) this.y = 0;
//         if (this.y < 0) this.y = this.canvas.height;
//       }

//       draw() {
//         this.ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, ${this.opacity})`;
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         this.ctx.fill();
//       }
//     }

//     const init = () => {
//       particles = [];
//       const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle(canvas, ctx));
//       }
//     };

//     const animate = () => {
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });

//       particles.forEach((particleA, indexA) => {
//         particles.slice(indexA + 1).forEach(particleB => {
//           const dx = particleA.x - particleB.x;
//           const dy = particleA.y - particleB.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 130) {
//             const avgHue = (particleA.hue + particleB.hue) / 2;
//             ctx.strokeStyle = `hsla(${avgHue}, 70%, 50%, ${0.18 * (1 - distance / 130)})`;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(particleA.x, particleA.y);
//             ctx.lineTo(particleB.x, particleB.y);
//             ctx.stroke();
//           }
//         });
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     init();
//     animate();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden" ref={sectionRef}>
//       {/* Canvas Motion Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       {/* Content */}
//       <div className="text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
//             NEWS & ARTICLES
//           </h1>
//           <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
//             At OneiSlone Entertainment, we believe in the power of stories to inspire, connect, and entertain.
//             Dive into our News & Articles for the latest insights, trends, and behind-the-scenes glimpses of
//             the entertainment world, where every tale matters and every voice counts.
//           </p>
//         </div>

//         {/* Articles Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {articles.map((article, index) => (
//             <div
//               key={article.id}
//               className={`group cursor-pointer transition-all duration-500 ${
//                 visibleCards[index]
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-10'
//               }`}
//             >
//               {/* Image Container */}
//               <div className="relative overflow-hidden rounded-lg mb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
//                 <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
//                   <img
//                     src={article.image}
//                     alt={article.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   {/* Overlay on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </div>
//                 {/* Hover Border Effect */}
//                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-lg transition-all duration-300 pointer-events-none" />
//               </div>

//               {/* Content */}
//               <div>
//                 <h3 className="text-base sm:text-lg font-semibold mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">
//                   {article.title}
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
//                   {article.date}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsArticles;
