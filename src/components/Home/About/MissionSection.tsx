import gifIcon from "@/assets/gif.gif";

const MissionSection = () => {
  return (
    <div className=" py-16 md:py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px] animate-pulse top-[20%] left-[10%]"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-400/15 rounded-full blur-[150px] animate-pulse animation-delay-2000 bottom-[20%] right-[15%]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6 md:mb-8  bg-[#3A5CFF0D] rounded-3xl border-t border-[#075A2F] w-[180px] sm:w-[195px] md:w-[200px] lg:w-[240px]  h-[50px] sm:h-[48px] md:h-[52px] mx-auto"
        >
          <img
            src={gifIcon}
            alt="Small Logo"
            className="h-9 w-9 object-contain logo-spin"
          />
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 font-light tracking-[0.25em] uppercase">
            About us
          </p>
        </motion.div>

        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[100%] text-center uppercase font-montserrat"
          style={{
            WebkitTextStroke: "1px #F2F2F2",
          }}
        >
          AT MARLOW DISTRIBUTION, WE ARE PASSIONATE STORYTELLERS COMMITTED TO
          CRAFTING UNFORGETTABLE EXPERIENCES THAT RESONATE WITH AUDIENCES AROUND
          THE GLOBE. OUR DIVERSE TEAM OF CREATIVES, DREAMERS, AND INNOVATORS
          COMES TOGETHER TO CELEBRATE THE ART OF STORYTELLING, EMPOWERING UNIQUE
          VOICES AND CAPTIVATING IMAGINATIONS. JOIN US ON THIS JOURNEY WHERE
          EVERY PROJECT IS A MASTERPIECE IN THE MAKING.
        </h2>
      </div>
    </div>
  );
};

export default MissionSection;

// ///import { useEffect, useRef } from 'react';
// import gifIcon from '@/assets/gif.gif';
import { motion } from "framer-motion";

// const MissionSection = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

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
//         this.size = Math.random() * 2.5 + 1;
//         this.speedX = Math.random() * 0.6 - 0.3;
//         this.speedY = Math.random() * 0.6 - 0.3;
//         this.opacity = Math.random() * 0.5 + 0.2;
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
//       const particleCount = Math.floor((canvas.width * canvas.height) / 13000);
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

//       // Draw connections
//       particles.forEach((particleA, indexA) => {
//         particles.slice(indexA + 1).forEach(particleB => {
//           const dx = particleA.x - particleB.x;
//           const dy = particleA.y - particleB.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 140) {
//             ctx.strokeStyle = `rgba(34, 197, 94, ${0.18 * (1 - distance / 140)})`;
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
//     <div className="bg-black py-16 md:py-24 relative overflow-hidden">
//       {/* Canvas Animated Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       <div className="max-w-5xl mx-auto relative z-10">
//         <div className="text-center mb-8">
//           <button className="bg-black border border-white/20 text-white px-6 py-3 rounded-full font-medium font-montserrat text-base leading-[130%] hover:border-green-400 transition-colors flex items-center gap-2 mx-auto cursor-pointer">
//             <img
//               src={gifIcon}
//               alt="About Us Icon"
//               className="w-8 h-8 aspect-square object-contain"
//             />
//             About Us
//           </button>
//         </div>

//         <h2
//           className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[100%] text-center uppercase font-montserrat"
//           style={{
//             WebkitTextStroke: '1px #F2F2F2',
//           }}
//         >
//           AT MARLOW DISTRIBUTION, WE ARE PASSIONATE STORYTELLERS COMMITTED TO CRAFTING UNFORGETTABLE EXPERIENCES THAT RESONATE WITH AUDIENCES AROUND THE GLOBE. OUR DIVERSE TEAM OF CREATIVES, DREAMERS, AND INNOVATORS COMES TOGETHER TO CELEBRATE THE ART OF STORYTELLING, EMPOWERING UNIQUE VOICES AND CAPTIVATING IMAGINATIONS. JOIN US ON THIS JOURNEY WHERE EVERY PROJECT IS A MASTERPIECE IN THE MAKING.
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default MissionSection;
