/* eslint-disable no-unused-vars */
import { BookOpen, Star } from "lucide-react";
import topIcon from "../../assets/icons/top-icon.png";
import Button from "../../components/ui/Button";
import bannerImage from "../../assets/images/bannerImage.png";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Home = () => {
  
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;

    if (!card || !container) return;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = ((event.clientX - centerX) / rect.width) * 30;
      const mouseY = ((event.clientY - centerY) / rect.height) * 20;

      gsap.to(card, {
        duration: 0.5,
        rotationY: mouseX,
        rotationX: -mouseY,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.5,
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animation variants (using Framer Motion for text elements)
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
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto flex justify-start items-center gap-12"
      style={{ height: "calc(100vh - 80px)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-219.75 flex flex-col gap-4 items-start justify-start">
        <motion.p
          className="px-4 py-2 text-white text-sm font-normal font-Merriweather leading-5 bg-stone-500/50 rounded-full inline-flex justify-start items-center gap-2"
          variants={itemVariants}
          animate={floatingAnimation}
        >
          <motion.img
            src={topIcon}
            alt=""
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          Start Your Musical Journey
        </motion.p>

        <motion.h1
          className="text-neutral-100 text-8xl font-normal font-OldLondon"
          variants={itemVariants}
        >
          The Jammers Guild
        </motion.h1>

        <motion.p
          className="text-stone-50/80 text-xl font-normal font-Merriweather leading-8"
          variants={itemVariants}
        >
          Explore songs, stories, and musical worlds in different languages.
          Make learning fun with interactive lyrics, cultural insights, and
          exciting quizzes.
        </motion.p>

        <motion.div
          className="flex justify-start items-center gap-5.75 mt-6"
          variants={itemVariants}
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button className="p-7.75 flex justify-center items-center text-white text-base font-normal font-Merriweather leading-4 gap-2">
              <BookOpen /> Explore Languages
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              className="p-7.75 flex justify-center items-center text-white text-base font-normal font-Merriweather leading-4 gap-2"
              variant="gold"
            >
              <Star /> Become a Member
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* GSAP 3D Card Container */}
      <div
        ref={containerRef}
        className="perspective relative group cursor-pointer flex justify-stretch items-center"
        style={{
          width: "385px",
          height: "400px",
          perspective: "1000px",
        }}
      >
        <div
          ref={cardRef}
          className="w-96.25 h-full transform-style-3d transition-transform duration-500 ease-out relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Image */}
          <div
            className="thumb w-full h-full rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translateZ(0px)",
              boxShadow: "0 70px 63px -60px rgba(73, 72, 72, 0.5)",
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                filter: "blur(30px)",
                transform: "translateZ(-50px)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;