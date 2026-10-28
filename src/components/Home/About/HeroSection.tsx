import heroVideo from "@/assets/video/111.mp4";

const HeroSection = () => {
  const title1 = "GLOBAL".split("");
  const title2 = "STAGE".split("");

  return (
    <div className="relative mt-12 flex w-full min-w-0 flex-col items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Green animated blobs */}
        {/* <div className="absolute w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[120px] animate-pulse top-[10%] left-[5%]"></div>
        <div className="absolute w-[600px] h-[600px] bg-green-400/20 rounded-full blur-[150px] animate-pulse animation-delay-1000 bottom-[15%] right-[10%]"></div>
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/25 rounded-full blur-[100px] animate-pulse animation-delay-2000 top-[50%] right-[20%]"></div>
        <div className="absolute w-[450px] h-[450px] bg-green-300/15 rounded-full blur-[130px] animate-pulse animation-delay-3000 bottom-[30%] left-[15%]"></div> */}

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-800/5 via-transparent to-green-900/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-[787px] mx-auto mb-16">
        <h1
          className="text-center font-montserrat text-3xl font-semibold uppercase leading-[120%] tracking-[-0.96px] text-[#F2F2F2] sm:text-4xl md:text-5xl"
          style={{
            WebkitTextStroke: "1px #E6FBED",
            fontStyle: "normal",
          }}
        >
          <span className="not-italic">EMPOWERING INDEPENDENT</span>
          <br />
          <span className="italic">
            ARTISTS ON A{" "}
            {title1.map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}{" "}
            {title2.map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-pulse"
                style={{ animationDelay: `${(title1.length + index) * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>
        <p className="text-[#E3E3E3] text-base font-normal leading-[160%] font-montserrat text-center">
          At Marlow Distribution, we empower artists worldwide, creating
          unforgettable stories through music.
        </p>
      </div>

      {/* Video Section */}
      <div className="relative z-10 w-full min-w-0">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
          <video
            className="aspect-video w-full max-h-[32rem] object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// ///* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useRef, useState } from 'react';
// import heroVideo from "@/assets/video/111.mp4";

// const HeroSection = () => {
//   const title1 = "GLOBAL".split("");
//   const title2 = "STAGE".split("");
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Trigger animations on mount
//     setTimeout(() => setIsVisible(true), 100);
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
//         this.size = Math.random() * 3 + 1;
//         this.speedX = Math.random() * 0.8 - 0.4;
//         this.speedY = Math.random() * 0.8 - 0.4;
//         this.opacity = Math.random() * 0.6 + 0.2;
//         this.hue = Math.random() * 30 + 110; // Green range: 110-140
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
//         this.ctx.fillStyle = `hsla(${this.hue}, 70%, 55%, ${this.opacity})`;
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         this.ctx.fill();

//         // Add glow effect
//         this.ctx.shadowBlur = 15;
//         this.ctx.shadowColor = `hsla(${this.hue}, 70%, 55%, ${this.opacity * 0.8})`;
//       }
//     }

//     const init = () => {
//       particles = [];
//       const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
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

//       // Draw connections with gradient
//       particles.forEach((particleA, indexA) => {
//         particles.slice(indexA + 1).forEach(particleB => {
//           const dx = particleA.x - particleB.x;
//           const dy = particleA.y - particleB.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 120) {
//             const avgHue = (particleA.hue + particleB.hue) / 2;
//             const gradient = ctx.createLinearGradient(
//               particleA.x, particleA.y,
//               particleB.x, particleB.y
//             );
//             gradient.addColorStop(0, `hsla(${particleA.hue}, 70%, 55%, ${0.2 * (1 - distance / 120)})`);
//             gradient.addColorStop(1, `hsla(${particleB.hue}, 70%, 55%, ${0.2 * (1 - distance / 120)})`);

//             ctx.strokeStyle = gradient;
//             ctx.lineWidth = 1.5;
//             ctx.beginPath();
//             ctx.moveTo(particleA.x, particleA.y);
//             ctx.lineTo(particleB.x, particleB.y);
//             ctx.stroke();
//           }
//         });
//       });

//       ctx.shadowBlur = 0;
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
//     <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-16 px-5 sm:px-8 md:py-24">
//       {/* Canvas Motion Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         style={{ zIndex: 0 }}
//       />

//       {/* Gradient overlays for depth */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10 z-[1]"></div>
//       <div className="absolute inset-0 bg-gradient-to-tl from-green-800/5 via-transparent to-green-900/5 z-[1]"></div>

//       {/* Content */}
//       <div className={`relative z-10 flex flex-col items-center gap-4 w-full max-w-[787px] mx-auto mb-16 transition-all duration-1000 ${
//         isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//       }`}>
//         <h1
//           className="text-[48px] font-semibold text-[#F2F2F2] tracking-[-0.96px] uppercase leading-[120%] font-montserrat text-center"
//           style={{
//             WebkitTextStroke: '1px #E6FBED',
//             fontStyle: 'normal'
//           }}
//         >
//           <span className="not-italic">EMPOWERING INDEPENDENT</span>
//           <br />
//           <span className="italic">
//             ARTISTS ON A {title1.map((letter, index) => (
//               <span
//                 key={index}
//                 className="inline-block animate-pulse"
//                 style={{
//                   animationDelay: `${index * 0.1}s`,
//                   animationDuration: '2s'
//                 }}
//               >
//                 {letter}
//               </span>
//             ))}{" "}
//             {title2.map((letter, index) => (
//               <span
//                 key={index}
//                 className="inline-block animate-pulse"
//                 style={{
//                   animationDelay: `${(title1.length + index) * 0.1}s`,
//                   animationDuration: '2s'
//                 }}
//               >
//                 {letter}
//               </span>
//             ))}
//           </span>
//         </h1>
//         <p className={`text-[#E3E3E3] text-base font-normal leading-[160%] font-montserrat text-center transition-all duration-1000 delay-300 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
//         }`}>
//           At Marlow Distribution, we empower artists worldwide, creating unforgettable stories through music.
//         </p>
//       </div>

//       {/* Video Section */}
//       <div className={`relative z-10 w-full max-w-7xl mx-auto transition-all duration-1000 delay-500 ${
//         isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
//       }`}>
//         <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 group">
//           {/* Animated border glow */}
//           <div className="absolute inset-0 bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>

//           <video
//             className="w-full h-[60vh] object-cover"
//             autoPlay
//             loop
//             muted
//             playsInline
//           >
//             <source src={heroVideo} type="video/mp4" />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

//           {/* Animated corner accents */}
//           <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
