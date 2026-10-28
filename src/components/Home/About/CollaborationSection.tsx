import pic13 from "../../../assets/pic13.png";
import cc from "../../../assets/cc.png";
import pach from "../../../assets/pach.png";

const CollaborationSection = () => {
  return (
    <div className="bg-black/50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-sans text-white/20 mb-8">
              <span className="text-white">
                FOSTERING COLLABORATION & DIVERSITY
              </span>
            </h2>

            <p className="text-gray-400 text-lg mb-12">
              We are committed to building a vibrant, inclusive community where
              artists from all backgrounds can connect, collaborate, and thrive.
              We celebrate diversity and believe it's the heart of creativity.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <img
                  src={cc}
                  alt="Inclusive Community"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Inclusive Community
                  </h3>
                  <p className="text-gray-400">
                    A welcoming space for artists of all genres, backgrounds,
                    and identities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <img
                  src={pach}
                  alt="Collaboration Platform"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Collaboration Platform
                  </h3>
                  <p className="text-gray-400">
                    Connect with other artists, find collaborators, and create
                    amazing music together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
              <img
                src={pic13}
                alt="Live Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSection;

// //import { useEffect, useRef } from 'react';
// import pic13 from '../../../assets/pic13.png';
// import cc from '../../../assets/cc.png';
// import pach from '../../../assets/pach.png';

// const CollaborationSection = () => {
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
//         this.size = Math.random() * 2 + 1;
//         this.speedX = Math.random() * 0.5 - 0.25;
//         this.speedY = Math.random() * 0.5 - 0.25;
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
//     <div className="bg-black py-16 md:py-24 relative overflow-hidden">
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/20 mb-8">
//               <span className="text-white">FOSTERING COLLABORATION & DIVERSITY</span>
//             </h2>

//             <p className="text-gray-400 text-lg mb-12">
//               We are committed to building a vibrant, inclusive community where artists from all backgrounds can connect, collaborate, and thrive. We celebrate diversity and believe it's the heart of creativity.
//             </p>

//             <div className="space-y-6">
//               <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
//                 <img src={cc} alt="Inclusive Community" className="w-8 h-8 object-contain" />
//                 <div>
//                   <h3 className="text-xl font-bold text-white mb-2">Inclusive Community</h3>
//                   <p className="text-gray-400">A welcoming space for artists of all genres, backgrounds, and identities.</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
//                 <img src={pach} alt="Collaboration Platform" className="w-8 h-8 object-contain" />
//                 <div>
//                   <h3 className="text-xl font-bold text-white mb-2">Collaboration Platform</h3>
//                   <p className="text-gray-400">Connect with other artists, find collaborators, and create amazing music together.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="relative group">
//             <div className="aspect-square rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
//               <img
//                 src={pic13}
//                 alt="Live Performance"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollaborationSection;
