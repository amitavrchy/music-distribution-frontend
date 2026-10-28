/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, JSX } from "react";
import musicPlayerBackground from "@/assets/video/music_player_background.mp4";

export default function AudioPlayer({
  url,
  title = "Audio Title",
}: {
  url: string;
  title?: string;
}): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrent(audio.currentTime);
    const onLoad = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsReady(true);
      }
    };
    // If playback stalls or waiting for data
    const onWaiting = () => setIsReady(false);
    const onCanPlay = () => setIsReady(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);

    // Sync video automatically when audio plays/pauses (best effort)
    const handleVideoPlay = () => {
      if (videoRef.current) videoRef.current.play().catch(() => {});
    };
    const handleVideoPause = () => {
      if (videoRef.current) videoRef.current.pause();
    };

    audio.addEventListener("play", handleVideoPlay);
    audio.addEventListener("pause", handleVideoPause);

    // Initial check for cached metadata
    if (audio.readyState >= 1) onLoad();

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", handleVideoPlay);
      audio.removeEventListener("pause", handleVideoPause);
    };
  }, []);

  // If no URL is provided, show a graceful message
  if (!url) {
    return (
      <div className="relative w-fit px-10 h-[42px] flex items-center justify-center bg-transparent rounded-lg border border-red-400">
        <span className="text-xs text-red-400 font-medium">
          No Audio Available or correpted file
        </span>
      </div>
    );
  }

  // Toggle play/pause (sync audio & video)
  const togglePlay = async () => {
    if (!isReady) return; // Prevent interaction if not ready

    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        if (videoRef.current) videoRef.current.play().catch(() => {});
      } else {
        audio.pause();
        if (videoRef.current) videoRef.current.pause();
      }
    } catch (err) {
      console.error("Playback failed", err);
    }
  };

  // Sync state with audio element

  // Calculate progress percentage
  const percent = duration ? current / duration : 0;

  // Format time helper
  const format = (time: number) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // Handle seek via click on progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isReady) return;
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (x / width) * duration;

    audio.currentTime = newTime;
    setCurrent(newTime);
  };

  return (
    <div className="relative w-[198px] h-[42px] select-none group overflow-hidden rounded-lg">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={musicPlayerBackground}
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30 object-[70%_center]"
        autoPlay={false} // will play only when audio plays
      />

      {/* Audio Element */}
      <audio ref={audioRef} src={url} preload="metadata" />

      {/* Main Container SVG */}

      <svg
        width="198"
        height="42"
        viewBox="0 0 198 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 z-10"
      >
        {/* Fully Transparent Background */}
        <rect
          // onClick={togglePlay} style={{ cursor: "pointer" }}
          width="198"
          height="42"
          rx="8"
          fill="transparent"
        />
        {/* Stroke Border */}

        <rect
          onClick={togglePlay}
          style={{ cursor: isReady ? "pointer" : "default" }}
          x="0.5"
          y="0.5"
          width="197"
          height="41"
          rx="7.5"
          stroke="#C6C6C6"
          strokeOpacity="0.5"
        />
        {/* Play/Pause Button */}
        <g
          onClick={togglePlay}
          style={{
            cursor: isReady ? "pointer" : "default",
            opacity: isReady ? 1 : 0.5,
          }}
        >
          {!isReady ? (
            // Loading State
            <circle
              cx="24"
              cy="24"
              r="6"
              stroke="#3A5CFF"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 10"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 24 24"
                to="360 24 24"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          ) : isPlaying ? (
            <g>
              {/* Circle */}
              <path
                d="M24 31C22.6167 31 21.3167 30.7375 20.1 30.2125C18.8833 29.6875 17.825 28.975 16.925 28.075C16.025 27.175 15.3125 26.1167 14.7875 24.9C14.2625 23.6833 14 22.3833 14 21C14 19.6167 14.2625 18.3167 14.7875 17.1C15.3125 15.8833 16.025 14.825 16.925 13.925C17.825 13.025 18.8833 12.3125 20.1 11.7875C21.3167 11.2625 22.6167 11 24 11C25.3833 11 26.6833 11.2625 27.9 11.7875C29.1167 12.3125 30.175 13.025 31.075 13.925C31.975 14.825 32.6875 15.8833 33.2125 17.1C33.7375 18.3167 34 19.6167 34 21C34 22.3833 33.7375 23.6833 33.2125 24.9C32.6875 26.1167 31.975 27.175 31.075 28.075C30.175 28.975 29.1167 29.6875 27.9 30.2125C26.6833 30.7375 25.3833 31 24 31ZM24 29C26.2333 29 28.125 28.225 29.675 26.675C31.225 25.125 32 23.2333 32 21C32 18.7667 31.225 16.875 29.675 15.325C28.125 13.775 26.2333 13 24 13C21.7667 13 19.875 13.775 18.325 15.325C16.775 16.875 16 18.7667 16 21C16 23.2333 16.775 25.125 18.325 26.675C19.875 28.225 21.7667 29 24 29Z"
                fill="#3A5CFF"
              />
              {/* Pause Bars */}
              <rect x="21" y="17" width="2" height="8" rx="1" fill="#3A5CFF" />
              <rect x="25" y="17" width="2" height="8" rx="1" fill="#3A5CFF" />
            </g>
          ) : (
            <path
              d="M21.5 25.5L28.5 21L21.5 16.5V25.5ZM24 31C22.6167 31 21.3167 30.7375 20.1 30.2125C18.8833 29.6875 17.825 28.975 16.925 28.075C16.025 27.175 15.3125 26.1167 14.7875 24.9C14.2625 23.6833 14 22.3833 14 21C14 19.6167 14.2625 18.3167 14.7875 17.1C15.3125 15.8833 16.025 14.825 16.925 13.925C17.825 13.025 18.8833 12.3125 20.1 11.7875C21.3167 11.2625 22.6167 11 24 11C25.3833 11 26.6833 11.2625 27.9 11.7875C29.1167 12.3125 30.175 13.025 31.075 13.925C31.975 14.825 32.6875 15.8833 33.2125 17.1C33.7375 18.3167 34 19.6167 34 21C34 22.3833 33.7375 23.6833 33.2125 24.9C32.6875 26.1167 31.975 27.175 31.075 28.075C30.175 28.975 29.1167 29.6875 27.9 30.2125C26.6833 30.7375 25.3833 31 24 31ZM24 29C26.2333 29 28.125 28.225 29.675 26.675C31.225 25.125 32 23.2333 32 21C32 18.7667 31.225 16.875 29.675 15.325C28.125 13.775 26.2333 13 24 13C21.7667 13 19.875 13.775 18.325 15.325C16.775 16.875 16 18.7667 16 21C16 23.2333 16.775 25.125 18.325 26.675C19.875 28.225 21.7667 29 24 29Z"
              fill="#3A5CFF"
            />
          )}
        </g>
      </svg>

      {/* HTML Overlay */}
      <div className="absolute top-0 left-[48px] right-[16px] h-full flex flex-col justify-center pointer-events-none z-20">
        <div className="flex items-center justify-between w-full mb-1">
          <div className="text-[12px] font-semibold text-white truncate leading-tight mr-2">
            {title}
          </div>
          <div className="text-[10px] text-white font-medium shrink-0 leading-tight">
            {format(current)} / {format(duration)}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="relative w-full h-[4px] pointer-events-auto cursor-pointer group/progress"
          onClick={handleSeek as any}
        >
          <div className="w-full h-full bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3A5CFF] rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${percent * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// return (
//   <div className="relative w-[198px] h-[42px] select-none group ">
//     <audio ref={audioRef} src={url} preload="metadata" />

//     {/* Main Container SVG */}
//     <svg
//       width="198"
//       height="42"
//       viewBox="0 0 198 42"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="absolute top-0 left-0"
//     >
//       {/* Background Rect - Mimicking the glass/light style */}
//       <rect
//         width="198"
//         height="42"
//         rx="8"
//         fill="#b3bdc7"
//         // Using a very light gray/white instead of the complex pattern base64 for performance
//         // If a specific pattern is strictly required, replace fill with that.
//       />
//       {/* Stroke Border */}
//       <rect
//         x="0.5"
//         y="0.5"
//         width="197"
//         height="41"
//         rx="7.5"
//         stroke="#C6C6C6"
//         strokeOpacity="0.5"
//       />

//       {/* Play/Pause Button Group */}
//       <g onClick={togglePlay} style={{ cursor: "pointer" }}>
//          {/* Custom Play/Pause Icon Logic */}
//          {isPlaying ? (
//             // Pause State: Circle with vertical bars
//             <g>
//               {/* Outer Ring */}
//                <path
//                  d="M24 31C22.6167 31 21.3167 30.7375 20.1 30.2125C18.8833 29.6875 17.825 28.975 16.925 28.075C16.025 27.175 15.3125 26.1167 14.7875 24.9C14.2625 23.6833 14 22.3833 14 21C14 19.6167 14.2625 18.3167 14.7875 17.1C15.3125 15.8833 16.025 14.825 16.925 13.925C17.825 13.025 18.8833 12.3125 20.1 11.7875C21.3167 11.2625 22.6167 11 24 11C25.3833 11 26.6833 11.2625 27.9 11.7875C29.1167 12.3125 30.175 13.025 31.075 13.925C31.975 14.825 32.6875 15.8833 33.2125 17.1C33.7375 18.3167 34 19.6167 34 21C34 22.3833 33.7375 23.6833 33.2125 24.9C32.6875 26.1167 31.975 27.175 31.075 28.075C30.175 28.975 29.1167 29.6875 27.9 30.2125C26.6833 30.7375 25.3833 31 24 31ZM24 29C26.2333 29 28.125 28.225 29.675 26.675C31.225 25.125 32 23.2333 32 21C32 18.7667 31.225 16.875 29.675 15.325C28.125 13.775 26.2333 13 24 13C21.7667 13 19.875 13.775 18.325 15.325C16.775 16.875 16 18.7667 16 21C16 23.2333 16.775 25.125 18.325 26.675C19.875 28.225 21.7667 29 24 29Z"
//                  fill="#3A5CFF"
//                />
//                {/* Pause Bars */}
//                <rect x="21" y="17" width="2" height="8" rx="1" fill="#3A5CFF" />
//                <rect x="25" y="17" width="2" height="8" rx="1" fill="#3A5CFF" />
//             </g>
//          ) : (
//             // Play State: The exact path from audioframe1.svg
//             <path
//               d="M21.5 25.5L28.5 21L21.5 16.5V25.5ZM24 31C22.6167 31 21.3167 30.7375 20.1 30.2125C18.8833 29.6875 17.825 28.975 16.925 28.075C16.025 27.175 15.3125 26.1167 14.7875 24.9C14.2625 23.6833 14 22.3833 14 21C14 19.6167 14.2625 18.3167 14.7875 17.1C15.3125 15.8833 16.025 14.825 16.925 13.925C17.825 13.025 18.8833 12.3125 20.1 11.7875C21.3167 11.2625 22.6167 11 24 11C25.3833 11 26.6833 11.2625 27.9 11.7875C29.1167 12.3125 30.175 13.025 31.075 13.925C31.975 14.825 32.6875 15.8833 33.2125 17.1C33.7375 18.3167 34 19.6167 34 21C34 22.3833 33.7375 23.6833 33.2125 24.9C32.6875 26.1167 31.975 27.175 31.075 28.075C30.175 28.975 29.1167 29.6875 27.9 30.2125C26.6833 30.7375 25.3833 31 24 31ZM24 29C26.2333 29 28.125 28.225 29.675 26.675C31.225 25.125 32 23.2333 32 21C32 18.7667 31.225 16.875 29.675 15.325C28.125 13.775 26.2333 13 24 13C21.7667 13 19.875 13.775 18.325 15.325C16.775 16.875 16 18.7667 16 21C16 23.2333 16.775 25.125 18.325 26.675C19.875 28.225 21.7667 29 24 29Z"
//               fill="#3A5CFF"
//             />
//          )}
//       </g>
//     </svg>

//     {/* HTML Content Overlay for Title and Progress */}
//     <div className="absolute top-0 left-[48px] right-[16px] h-full flex flex-col justify-center pointer-events-none">
//         {/* Header Row: Title & Time */}
//         <div className="flex items-center justify-between w-full mb-1">
//           <div className="text-[12px] font-semibold text-[#1A1A1A] truncate leading-tight mr-2">
//             {title}
//           </div>
//           <div className="text-[10px] text-[#6B7280] font-medium shrink-0 leading-tight">
//             {format(current)} / {format(duration)}
//           </div>
//         </div>

//         {/* Progress Bar Container - Clickable */}
//         <div className="relative w-full h-[4px] pointer-events-auto cursor-pointer group/progress" onClick={handleSeek as any}>
//            {/* Track */}
//            <div className="w-full h-full bg-[#E5E7EB] rounded-full overflow-hidden">
//               {/* Fill */}
//               <div
//                 className="h-full bg-[#3A5CFF] rounded-full transition-all duration-100 ease-linear"
//                 style={{ width: `${percent * 100}%` }}
//               />
//            </div>

//            {/* Hover Interaction Area (Invisible larger clickable area) */}
//            <div className="absolute -top-1 -bottom-1 w-full opacity-0 hover:opacity-100 transition-opacity">
//               {/* Optional: Add seek handle or tooltip on hover here if needed */}
//            </div>
//         </div>

//         {/* Duration Display (Optional small text aligned right if desired, keeping minimal for now to match SVG) */}
//     </div>
//   </div>
// );
