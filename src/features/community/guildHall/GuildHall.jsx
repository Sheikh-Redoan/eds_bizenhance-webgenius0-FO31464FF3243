import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import cardFrameImg from "../../../assets/images/cardFreame.png";
import buttonBorderSecondary from "../../../assets/images/Buttonbordersecoundary.png";
import guildGateImg from "../../../assets/images/guild_gate.jpg";
import studyChambersImg from "../../../assets/images/study_chambers.jpg";
import creativeForgeImg from "../../../assets/images/creative_forge.jpg";
import livingArchivesImg from "../../../assets/images/living_archives.jpg";
import supportWingImg from "../../../assets/images/support_wing.jpg";
import scholarsHallImg from "../../../assets/images/scholars_hall.jpg";

const GUILD_WINGS = [
  {
    id: "guild-gate",
    title: "The Guild Gate",
    path: "/community/guild-gate",
    desc: "General community, introductions, and lasting conversations.",
    image: guildGateImg,
  },
  {
    id: "study-chambers",
    title: "The Study Chambers",
    path: "/community/study-chambers",
    desc: "Teacher-led courses, sessions, and student learning.",
    image: studyChambersImg,
  },
  {
    id: "creative-forge",
    title: "The Creative Forge",
    path: "/community/creative-forge",
    desc: "Contests, original submissions, polls, and blind voting.",
    image: creativeForgeImg,
  },
  {
    id: "living-archives",
    title: "The Living Archives",
    path: "/community/living-archives",
    desc: "Official songs, evolving lyrics, and preserved versions.",
    image: livingArchivesImg,
  },
  {
    id: "support-wing",
    title: "The Support Wing",
    path: "/community/support-wing",
    desc: "Account, membership, community, and technical help.",
    image: supportWingImg,
  },
  {
    id: "scholars-hall",
    title: "The Scholar's Hall",
    path: "/community/scholars-hall",
    desc: "A private gathering for authorized Teachers and Linguists.",
    image: scholarsHallImg,
  },
];

export const WingCard = ({ wing }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(wing.path)}
      className="group relative w-full max-w-[270px] sm:max-w-[280px] md:max-w-[290px] mx-auto cursor-pointer select-none transition-transform duration-300 hover:-translate-y-1.5"
      style={{ aspectRatio: "259 / 430" }}
    >
      {/* Inner Card Content (placed beneath the ornate frame) */}
      <div className="absolute inset-[14px] sm:inset-[16px] md:inset-[18px] flex flex-col rounded-sm overflow-hidden bg-[#FFF1E0] shadow-inner">
        {/* Top Artwork Image with Gradient Overlay */}
        <div className="relative w-full h-[56%] shrink-0 overflow-hidden bg-[#241309]">
          <img
            src={wing.image}
            alt={wing.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* Bottom fade into parchment content */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FFF1E0] pointer-events-none" />
        </div>

        {/* Content Section matching design: bg-[#FFF1E0] */}
        <div className="flex-1 flex flex-col justify-between items-center px-4 py-3 sm:px-5 sm:py-3.5 text-center bg-[#FFF1E0]">
          {/* Title and Description */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 my-auto">
            <h3 className="text-[#755F48] text-base sm:text-lg font-normal font-Merriweather leading-snug group-hover:text-[#4d3b2b] transition-colors">
              {wing.title}
            </h3>

            <p className="text-[#8A7254] text-[10px] sm:text-[11px] font-normal font-Merriweather leading-relaxed max-w-[200px]">
              {wing.desc}
            </p>
          </div>

          {/* Ornate ENTER Button */}
          <div className="w-full pt-1 flex justify-center">
            <div className="relative w-36 sm:w-40 h-9 sm:h-10 flex items-center justify-center transition-all duration-200 group-hover:brightness-110 active:scale-95 bg-[#8B7355]">
              <img
                src={buttonBorderSecondary}
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-sm"
              />
              <span className="relative z-10 inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-normal font-Merriweather leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                <span>ENTER</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ornate Gold Woodcut Outer Frame */}
      <img
        src={cardFrameImg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
      />
    </div>
  );
};

export const GuildHall = () => {
  return (
    <div className="relative w-full my-4 flex flex-col items-center">
      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-4xl">
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-OldLondon leading-[1.05] tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            The Jammers Guild Hall
          </h1>

          <p className="text-white/80 text-sm sm:text-lg md:text-xl font-normal font-Merriweather leading-relaxed sm:leading-8 max-w-3xl drop-shadow-sm px-2">
            Enter the grand halls of knowledge, fellowship, and boundless craft.
            Choose a consecrated wing to commune with fellow scribes, master
            artisans, and linguistic scholars across the realms.
          </p>
        </div>

        {/* 6 Consecrated Guild Wings Grid (3 columns on lg, 2 on sm/md, 1 on mobile) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pt-2 items-center justify-center">
          {GUILD_WINGS.map((wing) => (
            <WingCard key={wing.id} wing={wing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuildHall;
