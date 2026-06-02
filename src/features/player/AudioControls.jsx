import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePlay, setCurrentTime, setVolume, toggleMute } from "./playerSlice";
import { selectCurrentStep, nextStep } from "../../redux/slices/tutorialSlice";
import { Play, Pause, Volume2, VolumeOff, Volume1, VolumeX } from "lucide-react";

const AudioControls = ({ audioRef }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const { isPlaying, currentTime, duration, currentSong, volume, isMuted } =
    useSelector((state) => state.player);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    
    dispatch(setVolume(newVolume));
    
    if (audioRef && audioRef.current) {
      audioRef.current.volume = newVolume;
      
      if (isMuted && newVolume > 0) {
        dispatch(toggleMute());
        audioRef.current.muted = false;
      }
    }
  };

  const handleMuteToggle = () => {
    if (audioRef && audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    dispatch(toggleMute());
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = isMuted ? 0 : volume * 100;

  const getVolumeIcon = () => {
    const iconSize = window.innerWidth <= 480 ? 18 : 24;
    
    if (isMuted || volume === 0) {
      return <VolumeX size={iconSize} />;
    } else if (volume < 0.33) {
      return <VolumeOff size={iconSize} />;
    } else if (volume < 0.66) {
      return <Volume1 size={iconSize} />;
    } else {
      return <Volume2 size={iconSize} />;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#A56B47] to-[#3F291B] px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-5 shadow-2xl flex items-center gap-2 sm:gap-4 md:gap-6 z-50 w-full">
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        
        {/* Play/Pause Button */}
        <button
          id="tour-play-song"
          onClick={() => {
            if (currentStep === 4 && !isPlaying) dispatch(nextStep());
            dispatch(togglePlay());
          }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 sm:border-3 md:border-4 border-[#8B7355] text-white flex items-center justify-center hover:opacity-90 transition shrink-0"
        >
          {isPlaying ? (
            <Pause size={window.innerWidth <= 480 ? 14 : window.innerWidth <= 768 ? 16 : 20} fill="currentColor" />
          ) : (
            <Play size={window.innerWidth <= 480 ? 14 : window.innerWidth <= 768 ? 16 : 20} fill="currentColor" className="ml-0.5 sm:ml-1" />
          )}
        </button>

        {/* Progress Section */}
        <div className="flex-1 flex flex-col gap-1 sm:gap-2 mx-2 sm:mx-4 md:mx-6 min-w-0">
          <div className="flex justify-between text-xs sm:text-sm font-bold text-white tracking-wider">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="truncate max-w-[80px] sm:max-w-[150px] md:max-w-[200px] text-center font-medium px-1 sm:px-2">
              {currentSong?.title || "No Song"}
            </span>
            <span className="font-mono">{formatTime(duration)}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              style={{
                background: `linear-gradient(to right, #51B943 0%, #51B943 ${progressPercentage}%, #FFFFFF ${progressPercentage}%, #FFFFFF 100%)`
              }}
              className="w-full h-2 sm:h-3 md:h-4 appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Volume Controls - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={handleMuteToggle}
            className="text-white hover:text-gray-200 transition-colors p-0.5 sm:p-1"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {getVolumeIcon()}
          </button>
          
          {/* Volume Slider - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:block relative w-20 lg:w-32">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{
                background: `linear-gradient(to right, #51B943 0%, #51B943 ${volumePercentage}%, #FFFFFF ${volumePercentage}%, #FFFFFF 100%)`
              }}
              className="w-full h-2 appearance-none cursor-pointer"
            />
          </div>
          
          {/* Volume Percentage - Hidden on smaller tablets */}
          <span className="hidden lg:block text-white text-xs sm:text-sm font-mono w-8 sm:w-10 md:w-12 text-right">
            {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
          </span>
        </div>

        {/* Mobile Volume Toggle (shows percentage when not muted) */}
        <button
          onClick={handleMuteToggle}
          className="sm:hidden text-white hover:text-gray-200 transition-colors p-1 flex items-center gap-1"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {getVolumeIcon()}
          <span className="text-xs font-mono">
            {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AudioControls;