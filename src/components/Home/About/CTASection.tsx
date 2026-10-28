import { Link } from "react-router-dom";
import ReuseButon from "../Shared/ReuseButon";

const CTASection = () => {
  return (
    <div className="bg-black/50  py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          JOIN US ON THE JOURNEY
        </h2>

        {/* Description */}
        <p className="text-[#CACACA] text-center text-sm md:text-base leading-relaxed ">
          Are you ready to take your music career to the next level? Join us{" "}
          <br /> today and become part of a community of independent artists{" "}
          <br /> who are changing the music industry.
        </p>

        {/* CTA Button */}
        {/* <div className="pt-4">
          <button
            className="
              px-10 py-4
              rounded-full
              text-base md:text-lg
              font-semibold
              text-white
              bg-blue-600
              hover:bg-blue-700
              transition-all
              duration-300
              active:scale-95
            "
          >
            Join Us Now
          </button>
        </div> */}

        <Link to="/login">
          {" "}
          <ReuseButon
            text="Join Us Now"
            onClick={() => console.log("Button clicked")}
          />
        </Link>
      </div>
    </div>
  );
};

export default CTASection;

// import { useEffect, useRef } from 'react';

// const CTASection = () => {
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
//       hue: number;

//       constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
//         this.canvas = canvas;
//         this.ctx = ctx;
//         this.x = Math.random() * this.canvas.width;
//         this.y = Math.random() * this.canvas.height;
//         this.size = Math.random() * 3 + 1;
//         this.speedX = Math.random() * 0.8 - 0.4;
//         this.speedY = Math.random() * 0.8 - 0.4;
//         this.opacity = Math.random() * 0.6 + 0.2;
//         this.hue = Math.random() * 40 + 200; // Blue range: 200-240
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
//         this.ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
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
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
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

//           if (distance < 120) {
//             const avgHue = (particleA.hue + particleB.hue) / 2;
//             ctx.strokeStyle = `hsla(${avgHue}, 80%, 60%, ${0.2 * (1 - distance / 120)})`;
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
//     <div className="bg-black/50 py-16 md:py-24 relative overflow-hidden">
//       {/* Canvas animated background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       <div className="max-w-4xl mx-auto text-center relative z-10">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/20 mb-8">
//           <span className="text-white">JOIN US ON THE JOURNEY</span>
//         </h2>

//         <p className="text-gray-400 text-lg mb-12">
//           Are you ready to take your music career to the next level? Join us today and become part of a community of independent artists who are changing the music industry.
//         </p>

//         <div className="relative inline-block">
//           <button className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 active:scale-95 cursor-pointer">
//             Join Us Now
//           </button>

//           {/* Blue animated glow effect */}
//           <div className="absolute inset-0 -z-10">
//             <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
//             <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl animate-ping" style={{animationDuration: '2s'}}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CTASection;
