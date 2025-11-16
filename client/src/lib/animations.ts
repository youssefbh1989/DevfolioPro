import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 100,
      damping: 15
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 120,
      damping: 12
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80, rotateY: -25 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 80,
      damping: 15
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80, rotateY: 25 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 80,
      damping: 15
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 100,
      damping: 15
    },
  },
};

export const floatingAnimation: Variants = {
  initial: { y: 0, rotateZ: 0 },
  animate: {
    y: [-12, 12, -12],
    rotateZ: [-2, 2, -2],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const pulseGlow: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const perspective3D: Variants = {
  hidden: { 
    opacity: 0, 
    rotateX: 90, 
    transformPerspective: 1000,
    z: -100
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    z: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 60,
      damping: 20
    },
  },
};

export const glowPulse: Variants = {
  initial: { opacity: 0.7, filter: "drop-shadow(0 0 0px rgba(125, 11, 46, 0))" },
  animate: {
    opacity: [0.7, 1, 0.7],
    filter: [
      "drop-shadow(0 0 0px rgba(125, 11, 46, 0))",
      "drop-shadow(0 0 20px rgba(125, 11, 46, 0.6))",
      "drop-shadow(0 0 0px rgba(125, 11, 46, 0))"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const magneticHover = {
  rest: { scale: 1, rotateY: 0, rotateX: 0 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    rotateX: 0,
    rotateY: 0,
    filter: "brightness(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
  },
  hover: {
    scale: 1.03,
    y: -8,
    filter: "brightness(1.05) drop-shadow(0 20px 40px rgba(125, 11, 46, 0.15))",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const parallaxScroll = (speed: number = 1) => ({
  initial: { y: 0 },
  animate: { y: 0 },
  whileInView: {
    y: speed * -50,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const revealText: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    rotateX: -30,
    filter: "blur(8px)"
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.05,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 100,
      damping: 15
    },
  }),
};

export const slideUpFade: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 80,
      damping: 18
    },
  },
};

export const morphIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5, 
    rotateX: 45,
    rotateY: 45,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 60,
      damping: 20
    },
  },
};
