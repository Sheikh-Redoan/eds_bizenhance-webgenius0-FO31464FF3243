/* eslint-disable no-unused-vars */
import cardBg from "../../assets/images/cardFreame.png";
import { ChevronRight, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const languages = [
  {
    id: "japanese",
    name: "Japanese",
    imagesrc: "src/assets/images/languageImages/Japnasse.png",
  },
  {
    id: "korean",
    name: "Korean",
    imagesrc: "src/assets/images/languageImages/Korean.png",
  },
  {
    id: "spanish",
    name: "Spanish",
    imagesrc: "src/assets/images/languageImages/Spanish.png",
  },
  {
    id: "italian",
    name: "Italian",
    imagesrc: "src/assets/images/languageImages/Japnasse.png",
  },
];

const LanguageSelect = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [descRef, descInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "backOut",
      },
    }),
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
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
        delay: 1,
        ease: "backOut",
      },
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
      },
    },
  };


  return (
    <motion.div
      className="max-w-6xl mx-auto flex flex-col justify-start items-center gap-12 pt-30"
      style={{ height: "calc(100vh - 80px)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-219.75 flex flex-col gap-4 items-center justify-center">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="relative"
        >
          <h1 className="text-center justify-center text-white text-8xl font-normal font-OldLondon">
            Choose Your Language
          </h1>
          {/* Underline animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <motion.div
          ref={descRef}
          initial="hidden"
          animate={descInView ? "visible" : "hidden"}
          variants={descriptionVariants}
        >
          <p className="mt-4 text-center justify-center text-white/80 text-xl font-normal font-Merriweather leading-8 max-w-183 mx-auto">
            Each language is a new story waiting to be discovered. Pick your
            adventure and start learning!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
          variants={containerVariants}
        >
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              className="relative"
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              initial="hidden"
              animate="visible"
            >
              

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0"
                whileHover={{ opacity: 0.3 }}
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,215,0,0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div
                className="border-20 border-wood rounded-lg shadow-lg relative overflow-hidden bg-transparent"
                style={{
                  borderImage: `url(${cardBg}) 30 round`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-[#ffd6a2] overflow-hidden">
                  <motion.div
                    className="relative overflow-hidden"
                    variants={imageVariants}
                  >
                    <img
                      className="w-45 h-48 object-cover"
                      src={lang.imagesrc}
                      alt={lang.name}
                    />
                    {/* Image overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <div className="bg-[#755F48] flex justify-center items-center flex-col py-5">
                    <motion.p
                      className="self-stretch text-center justify-center text-white text-2xl font-semibold font-Merriweather leading-8 mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {lang.name}
                    </motion.p>

                    <motion.button
                      className="text-white flex justify-center items-center gap-2 group"
                      variants={buttonVariants}
                      whileHover="hover"
                    >
                      <Music size={18} className="group-hover:text-yellow-300 transition-colors" />
                      <p className="text-center justify-center text-white text-sm font-normal font-Merriweather leading-5 group-hover:text-yellow-300 transition-colors">
                        Explore Songs
                      </p>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={18} className="group-hover:text-yellow-300 transition-colors" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                {/* Card shine effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: [0, 0.8, 0],
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle background animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LanguageSelect;