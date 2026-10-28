import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const padClass = {
  section: "py-16 md:py-24",
  tight: "py-8 md:py-12",
  none: "",
};

type SectionFrameProps = {
  children: ReactNode;
  className?: string;
  pad?: keyof typeof padClass;
  delay?: number;
};

export function SectionFrame({
  children,
  className = "",
  pad = "section",
  delay = 0,
}: SectionFrameProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={`min-w-0 overflow-x-clip ${padClass[pad]} ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.section>
  );
}
