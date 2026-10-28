// HeroBackgroundBlobs.tsx
const HeroBackgroundBlobs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-16 top-0">
      <div className="absolute w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[120px] animate-pulse top-[10%]  left-[5%]"></div>
      <div className="absolute w-[600px] h-[600px] bg-green-400/20 rounded-full blur-[150px] animate-pulse animation-delay-1000 bottom-[15%] right-[10%]"></div>
      <div className="absolute w-[400px] h-[400px] bg-emerald-500/25 rounded-full blur-[100px] animate-pulse animation-delay-2000 top-[50%] right-[20%]"></div>
      <div className="absolute w-[450px] h-[450px] bg-green-300/15 rounded-full blur-[130px] animate-pulse animation-delay-3000 bottom-[30%] left-[15%]"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-green-800/5 via-transparent to-green-900/5"></div>
    </div>
  );
};

export default HeroBackgroundBlobs;
