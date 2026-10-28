type BrandMarkProps = {
  size?: number;
  className?: string;
};

export function BrandMark({ size = 36, className = "" }: BrandMarkProps) {
  return (
    <span
      role="img"
      aria-label="Marlow"
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a140f] text-[#f3e2c4] shadow-[inset_0_0_0_1px_rgba(232,196,138,0.5)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M4.5 26.5V5.5h5.4l6.1 11.6L22.1 5.5h5.4v21h-4.4V13.4L17.4 23h-2.8l-5.7-9.6v13.1H4.5z"
        />
      </svg>
    </span>
  );
}

export function BrandWordmark({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BrandMark size={32} />
      <span className="leading-none text-left">
        <span
          className={`block text-sm font-semibold tracking-[0.2em] ${light ? "text-[#1a140f]" : "text-[#f6f1e8]"}`}
        >
          MARLOW
        </span>
        <span className="block text-[9px] tracking-[0.24em] text-[#b08958]">
          DISTRIBUTION
        </span>
      </span>
    </span>
  );
}
