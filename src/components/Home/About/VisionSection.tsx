/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import char from "../../../assets/char.png";
import pach from "../../../assets/pach.png";

const VisionSection = () => {
  const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const visionItems = [
    {
      icon: char,
      title: "Fairness and Transparency",
      description:
        "We believe in a fair and transparent music industry where artists are compensated fairly for their work.",
    },
    {
      icon: pach,
      title: "Community and Collaboration",
      description:
        "We're building a community of artists who support and collaborate with each other.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visionItems.forEach((_, index) => {
              setTimeout(() => {
                setVisibleBoxes((prev) => {
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-sans text-white/20 mb-6 sm:mb-8 text-left">
          <span className="text-white">A VISION FOR CHANGE</span>
        </h2>

        <p className="text-gray-400 text-base sm:text-lg max-w-5xl mb-12 sm:mb-16 text-left">
          We're building a more equitable and sustainable music industry. We're
          committed to creating a world where every artist has the opportunity
          to succeed, regardless of their background or connections.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 l">
          {visionItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-[#0C1F1F] to-[#0C1F1F] p-7 sm:p-8 rounded-2xl border border-gray-700 hover:border-green-500 cursor-pointer transition-all duration-700 ease-out ${
                visibleBoxes[index]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              } hover:scale-105`}
            >
              <div className="mb-4 w-12 h-12 sm:w-14 sm:h-14">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-left">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed text-left">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionSection;

// //import { useEffect, useRef, useState } from 'react';
// import char from '../../../assets/char.png';
// import pach from '../../../assets/pach.png';

// const VisionSection = () => {
//   const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([false, false]);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const visionItems = [
//     {
//       icon: char,
//       title: 'Fairness and Transparency',
//       description: 'We believe in a fair and transparent music industry where artists are compensated fairly for their work.'
//     },
//     {
//       icon: pach,
//       title: 'Community and Collaboration',
//       description: "We're building a community of artists who support and collaborate with each other."
//     }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             visionItems.forEach((_, index) => {
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
//       ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
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
//     <div className="bg-gray-900 py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
//       {/* Canvas Motion Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       <div className="max-w-7xl mx-auto relative z-10">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/20 mb-6 sm:mb-8 text-left">
//           <span className="text-white">A VISION FOR CHANGE</span>
//         </h2>

//         <p className="text-gray-400 text-base sm:text-lg max-w-5xl mb-12 sm:mb-16 text-left">
//           We're building a more equitable and sustainable music industry. We're committed to creating a world where every artist has the opportunity to succeed, regardless of their background or connections.
//         </p>

//         <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-20 sm:gap-24 max-w-4xl">
//           {visionItems.map((item, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-br from-gray-800 to-gray-900 p-7 sm:p-8 rounded-2xl border border-gray-700 hover:border-green-500 cursor-pointer transition-all duration-500 ${
//                 visibleBoxes[index]
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-10'
//               } hover:scale-105`}
//             >
//               <div className="mb-4 w-12 h-12 sm:w-14 sm:h-14">
//                 <img
//                   src={item.icon}
//                   alt={item.title}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-left">{item.title}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed text-left">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisionSection;
