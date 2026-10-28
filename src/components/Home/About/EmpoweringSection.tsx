/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ekIcon from "@/assets/ek.png";
import duiIcon from "@/assets/dui.png";
import tinIcon from "@/assets/tin.png";

const EmpoweringSection = () => {
  const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: ekIcon,
      title: "Financial Independence",
      description:
        "Take control of your finances with our transparent and artist-friendly revenue sharing model.",
    },
    {
      icon: duiIcon,
      title: "Creative Freedom",
      description:
        "You own your music. We provide the tools to create, distribute, and monetize your music without compromising your vision.",
    },
    {
      icon: tinIcon,
      title: "Global Reach",
      description:
        "Reach a global audience with our distribution network and marketing tools.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ekta ekta kore box show hobe
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleBoxes((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 300); // 300ms gap between each box
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
        <h2 className="text-[30px] md:text-4xl lg:text-[40px] font-sans text-[#E5E5E5] mb-8 text-left uppercase leading-[120%]">
          EMPOWERING ARTISTS
        </h2>

        <p className="text-[#CACACA] text-base md:text-lg max-w-5xl mb-16 text-left font-normal leading-[160%] font-montserrat">
          In an ever-evolving music industry, independent artists are breaking
          boundaries and redefining what it means to be successful. Leading the
          charge is Marlow Distribution, a groundbreaking music tech company
          dedicated to empowering independent musicians and creators around the
          world. By embracing creativity and innovation, we've established
          ourselves as a pivotal force facilitating the growth of independent
          artists at all levels of their careers.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-start w-full max-w-[384px] bg-gradient-to-br from-[#0C2020] to-[#0C2020] p-5 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-500 ${
                visibleBoxes[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } hover:scale-105`}
            >
              <div className="mb-6 flex-shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-[29.68px] h-[29.69px] object-contain"
                />
              </div>
              <h3 className="text-xl font-sans text-white mb-4 ">
                {feature.title}
              </h3>
              <p className="text-[#CACACA] font-normal leading-[160%] font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpoweringSection;

//import { useEffect, useRef, useState } from 'react';
// import ekIcon from '@/assets/ek.png';
// import duiIcon from '@/assets/dui.png';
// import tinIcon from '@/assets/tin.png';

// const EmpoweringSection = () => {
//   const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([false, false, false]);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const features = [
//     {
//       icon: ekIcon,
//       title: 'Financial Independence',
//       description: 'Take control of your finances with our transparent and artist-friendly revenue sharing model.'
//     },
//     {
//       icon: duiIcon,
//       title: 'Creative Freedom',
//       description: 'You own your music. We provide the tools to create, distribute, and monetize your music without compromising your vision.'
//     },
//     {
//       icon: tinIcon,
//       title: 'Global Reach',
//       description: 'Reach a global audience with our distribution network and marketing tools.'
//     }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             features.forEach((_, index) => {
//               setTimeout(() => {
//                 setVisibleBoxes((prev) => {
//                   const newState = [...prev];
//                   newState[index] = true;
//                   return newState;
//                 });
//               }, index * 300);
//             });
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.2 }
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

//       constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
//         this.canvas = canvas;
//         this.ctx = ctx;
//         this.x = Math.random() * this.canvas.width;
//         this.y = Math.random() * this.canvas.height;
//         this.size = Math.random() * 2 + 1;
//         this.speedX = Math.random() * 0.5 - 0.25;
//         this.speedY = Math.random() * 0.5 - 0.25;
//         this.opacity = Math.random() * 0.4 + 0.1;
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
//         this.ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         this.ctx.fill();
//       }
//     }

//     const init = () => {
//       particles = [];
//       const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle(canvas, ctx));
//       }
//     };

//     const animate = () => {
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });

//       // Draw connections
//       particles.forEach((particleA, indexA) => {
//         particles.slice(indexA + 1).forEach(particleB => {
//           const dx = particleA.x - particleB.x;
//           const dy = particleA.y - particleB.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 150) {
//             ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 * (1 - distance / 150)})`;
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
//     <div className="bg-black py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
//       {/* Canvas Motion Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       <div className="max-w-7xl mx-auto relative z-10">
//         <h2 className="text-[40px] md:text-5xl lg:text-6xl font-semibold text-[#E5E5E5] mb-8 text-left uppercase leading-[120%]">
//           EMPOWERING ARTISTS
//         </h2>

//         <p className="text-[#CACACA] text-base md:text-lg max-w-5xl mb-16 text-left font-normal leading-[160%] font-montserrat">
//           In an ever-evolving music industry, independent artists are breaking boundaries and redefining what it means to be successful. Leading the charge is Marlow Distribution, a groundbreaking music tech company dedicated to empowering independent musicians and creators around the world. By embracing creativity and innovation, we've established ourselves as a pivotal force facilitating the growth of independent artists at all levels of their careers.
//         </p>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className={`flex flex-col items-start w-full max-w-[384px] bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-500 ${
//                 visibleBoxes[index]
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-10'
//               } hover:scale-105`}
//             >
//               <div className="mb-6 flex-shrink-0">
//                 <img
//                   src={feature.icon}
//                   alt={feature.title}
//                   className="w-[29.68px] h-[29.69px] object-contain"
//                 />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">{feature.title}</h3>
//               <p className="text-[#CACACA] font-normal leading-[160%] font-montserrat">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpoweringSection;
