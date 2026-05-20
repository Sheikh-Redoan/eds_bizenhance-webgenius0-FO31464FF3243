/* eslint-disable no-unused-vars */
import { BookOpen, Star } from "lucide-react";
import topIcon from "../../assets/icons/top-icon.png";
import Button from "../../components/ui/Button";
import bannerImage from "../../assets/images/bannerImage.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Home = () => {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if it's desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // GSAP 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;

    if (!card || !container || !isDesktop) return;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate rotation with reduced sensitivity
      const mouseX = ((event.clientX - centerX) / rect.width) * 25; // Reduced from 30
      const mouseY = ((event.clientY - centerY) / rect.height) * 15; // Reduced from 20

      gsap.to(card, {
        duration: 0.5,
        rotationY: mouseX,
        rotationX: -mouseY,
        transformPerspective: 1000,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.8,
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDesktop]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-8 lg:py-16 gap-8 lg:gap-12"
      style={{ minHeight: "calc(100vh - 80px)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6 items-center lg:items-start text-center lg:text-left">
        <motion.div
          className="px-4 py-2 text-white text-sm font-normal font-Merriweather leading-5 bg-stone-500/50 rounded-full inline-flex items-center gap-2"
          variants={itemVariants}
          animate={floatingAnimation}
        >
          <motion.img
            src={topIcon}
            alt=""
            className="w-4 h-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          Start Your Musical Journey
        </motion.div>

        <motion.h1
          className="text-neutral-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-normal font-OldLondon leading-tight"
          variants={itemVariants}
        >
          The Jammers Guild
        </motion.h1>

        <motion.p
          className="text-stone-50/80 text-base sm:text-3 md:text-3 font-normal font-Merriweather leading-6 sm:leading-7 md:leading-8"
          variants={itemVariants}
        >
          Explore songs, stories, and musical worlds in different languages.
          Make learning fun with interactive lyrics, cultural insights, and
          exciting exercises.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 lg:mt-6 w-full max-w-md"
          variants={itemVariants}
        >
          <motion.div
            className="w-full sm:w-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/languages">
              <Button className="sm:w-auto px-6 py-6 lg:px-7 lg:py-7 flex justify-center items-center text-white text-sm sm:text-base font-normal font-Merriweather leading-4 gap-2 mx-auto">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[14px]">Explore Languages</span>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/membership">
              <Button className="sm:w-auto px-6 py-6 lg:px-7 lg:py-7 flex justify-center items-center text-white text-sm sm:text-base font-normal font-Merriweather leading-4 gap-2 mx-auto">
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[14px]">Become a Member</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Card Container */}
      <motion.div
        ref={containerRef}
        className="perspective relative group cursor-pointer order-first lg:order-last"
        style={{
          width: "100%",
          maxWidth: "min(385px, 90vw)",
          height: "300px",
          perspective: "1000px",
        }}
        variants={itemVariants}
        whileHover={{ scale: isDesktop ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={cardRef}
          className="w-full h-full transform-style-3d transition-transform duration-500 ease-out relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${bannerImage})`,
              transform: "translateZ(0px)",
            }}
          />

          {/* Overlay Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Edge Glow - Desktop only */}
          {isDesktop && (
            <div
              className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
                filter: "blur(20px)",
                zIndex: -1,
              }}
            />
          )}
        </div>

        {/* Subtle border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default Home;
