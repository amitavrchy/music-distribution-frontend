import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full bg-gradient-to-br from-[#7B92FF] to-[#2941B5] opacity-70 blur-sm transition-transform duration-150"
      style={{
        transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
      }}
    />
  );
};

export default CustomCursor;
