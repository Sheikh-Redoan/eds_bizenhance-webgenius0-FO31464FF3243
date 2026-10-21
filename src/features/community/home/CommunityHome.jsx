import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Star,
} from "lucide-react";
import gsap from "gsap";
import topIcon from "../../../assets/icons/top-icon.png";
import communityHallImg from "../../../assets/images/community_hall.jpg";
import OrnateButton from "../components/OrnateButton";

export const CommunityHero = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // GSAP 3D interactive tilt effect matching home.tsx
  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container || !isDesktop) return;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = ((event.clientX - centerX) / rect.width) * 20;
      const mouseY = ((event.clientY - centerY) / rect.height) * 12;

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

  return (
    <div className="relative w-full h-[calc(100vh-180px)] my-4 flex justify-center items-center py-8">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        {/* Left Column: Heading, Subtitle, Ornate Buttons */}
        <div className="w-full lg:w-7/12 flex flex-col items-start gap-6 text-left">
          {/* Pill Badge */}
          <div className="px-4 py-2 bg-stone-500/50 backdrop-blur-xs rounded-full inline-flex items-center gap-2 border border-white/20 shadow-sm">
            <img
              src={topIcon}
              alt=""
              className="w-4 h-4 animate-spin-slow opacity-90"
              style={{ animation: "spin 12s linear infinite" }}
            />
            <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-5">
              Welcome to the community
            </span>
          </div>

          {/* Title in authentic Old London font */}
          <div className="space-y-4">
            <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-normal font-OldLondon leading-[1.05] tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              Lingual Jams community
            </h1>

            <p className="max-w-2xl text-stone-100/90 text-base sm:text-lg lg:text-xl font-normal font-Merriweather leading-relaxed sm:leading-8 drop-shadow-sm">
              A community of lyricists, linguists, and language artists.
              Compose, translate, critique, and celebrate language through song.
            </p>
          </div>

          {/* Ornate Frame Buttons matching design */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 w-full">
            <OrnateButton
              icon={BookOpen}
              onClick={() => navigate("/community/guild-hall")}
              className="w-full sm:w-auto min-w-[220px]"
            >
              Enter the Guild Hall
            </OrnateButton>

            <OrnateButton
              icon={Star}
              onClick={() => navigate("/community/living-archives")}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Explore Archives
            </OrnateButton>
          </div>
        </div>

        {/* Right Column: Guild Sanctuary Artwork with Torn Edges & 3D Tilt */}
        <div
          ref={containerRef}
          className="perspective w-full lg:w-5/12 flex items-center justify-center cursor-pointer"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={cardRef}
            className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square transform-style-3d transition-transform duration-500 ease-out group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Torn edge wrapper around image */}
            <div className="torn-parchment bg-[#1a0c04] p-2 shadow-2xl w-full h-full">
              <div
                className="torn-parchment-inner w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${communityHallImg})`,
                  transform: "translateZ(10px)",
                }}
              />
            </div>

            {/* Ambient glow accent */}
            <div
              className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.25) 0%, transparent 70%)",
                filter: "blur(25px)",
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommunityHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Top Banner Hero */}
      <CommunityHero />
    </div>
  );
};

export default CommunityHome;
