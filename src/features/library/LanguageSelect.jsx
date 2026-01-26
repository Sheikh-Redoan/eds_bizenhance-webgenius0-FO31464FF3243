/* eslint-disable no-unused-vars */
import cardBg from "../../assets/images/cardFreame.png";
import { ChevronRight, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useGetLanguagesQuery } from "../../redux/api/contentApi";

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { data: languageData, isLoading } = useGetLanguagesQuery();
  
  const languages = languageData?.data?.map(lang => ({
    id: lang.name,
    dbId: lang.id,
    name: lang.name,
    imagesrc: lang.image
  })) || [];
  
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
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.5)",
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
      className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-start items-center gap-6 lg:gap-12 py-8 lg:py-12 xl:py-20"
      style={{ minHeight: "calc(100vh - 80px)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl flex flex-col gap-3 lg:gap-6 items-center justify-center">
        {/* Title Section */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="relative w-full text-center px-2"
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal font-OldLondon leading-tight">
            Choose Your Language
          </h1>
          {/* Underline animation */}
          <motion.div
            className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-112 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          ref={descRef}
          initial="hidden"
          animate={descInView ? "visible" : "hidden"}
          variants={descriptionVariants}
          className="w-full max-w-2xl lg:max-w-3xl px-4"
        >
          <p className="mt-2 sm:mt-4 text-center text-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal font-Merriweather leading-5 sm:leading-6 md:leading-7 lg:leading-8">
            Each language is a new story waiting to be discovered. Pick your
            adventure and start learning!
          </p>
        </motion.div>

        {/* Language Cards Grid */}
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-6 lg:mt-10 xl:mt-12"
          variants={containerVariants}
        >
          {isLoading ? (
            <div className="text-white col-span-full text-center">Loading languages...</div>
          ) : (
            languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full"
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              initial="hidden"
              animate="visible"
            >
              {/* Glow effect on hover - Desktop only */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 hidden lg:block"
                whileHover={{ opacity: 0.3 }}
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,215,0,0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Card Container */}
              <div
                className="border-[12px] sm:border-[16px] lg:border-[20px] border-wood rounded-lg shadow-lg relative overflow-hidden bg-transparent w-full"
                style={{
                  borderImage: `url(${cardBg}) 30 round`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-[#ffd6a2] overflow-hidden">
                  {/* Image Section */}
                  <motion.div
                    className="relative overflow-hidden w-full aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/3]"
                    variants={imageVariants}
                  >
                    <img
                      className="w-full h-full object-cover"
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

                  {/* Language Info Section */}
                  <div className="bg-[#755F48] flex justify-center items-center flex-col py-3 sm:py-4 lg:py-5 px-2">
                    <motion.p
                      className="w-full text-center text-white text-lg sm:text-xl lg:text-2xl font-semibold font-Merriweather leading-6 sm:leading-7 lg:leading-8 mb-1 sm:mb-2 lg:mb-2 truncate"
                      whileHover={{ scale: 1.05 }}
                    >
                      {lang.name}
                    </motion.p>

                    {/* Explore Button */}
                    <motion.button
                      className="text-white flex justify-center items-center gap-1 sm:gap-2 group w-full"
                      variants={buttonVariants}
                      whileHover="hover"
                      onClick={() => navigate(`/languages/${lang.id}`)}
                    >
                      <Music size={14} smSize={16} lgSize={18} className="group-hover:text-yellow-300 transition-colors w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      <p className="text-center text-white text-xs sm:text-sm lg:text-base font-normal font-Merriweather leading-4 sm:leading-5 group-hover:text-yellow-300 transition-colors truncate">
                        Explore Songs
                      </p>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="group-hover:text-yellow-300 transition-colors w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                {/* Card shine effect - Desktop only */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-lg hidden lg:block"
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
          ))
          )}
        </motion.div>

        {/* Subtle background animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full bg-amber-500/10 blur-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LanguageSelect;