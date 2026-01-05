import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePlay,  setCurrentTime, setVolume, toggleMute } from "./playerSlice";
import { Play, Pause, Volume2, VolumeOff, Volume1, VolumeX } from "lucide-react";

const AudioControls = ({ audioRef }) => {
  const dispatch = useDispatch();
  const { isPlaying, currentTime, duration, currentSong,  volume, isMuted } =
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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Handles a change in the volume slider, updating the Redux state and
 * applying the new volume to the audio element if it exists.
 *
 * If the volume is set above 0 while the audio is muted, this function
 * will unmute the audio.
 */
/*******  5022a2d1-0be6-49b8-8a8e-ee1d048fd25a  *******/
  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    
    // Dispatch to update Redux state
    dispatch(setVolume(newVolume));
    
    // Apply volume to audio element
    if (audioRef && audioRef.current) {
      audioRef.current.volume = newVolume;
      
      // If volume is set above 0 while muted, unmute
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

  // Get appropriate volume icon based on volume level and mute state
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={24} />;
    } else if (volume < 0.33) {
      return <VolumeOff size={24} />;
    } else if (volume < 0.66) {
      return <Volume1 size={24} />;
    } else {
      return <Volume2 size={24} />;
    }
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A56B47] to-[#3F291B] px-8 py-5 shadow-2xl flex items-center gap-6 z-50 w-full">
      <div className="flex justify-center items-center max-w-[816px] mx-auto w-full">
        

        <button
          onClick={() => dispatch(togglePlay())}
          className="w-12 h-12 border-4 border-[#8B7355]  text-white flex items-center justify-center hover:opacity-90 transition shrink-0"
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-1" />
          )}
        </button>

        <div className="flex-1 flex flex-col gap-2 mx-6 w-full">
          <div className="flex justify-between text-sm font-bold text-white tracking-wider">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="truncate max-w-[200px] text-center font-medium">
              {currentSong?.title || "No Song Selected"}
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
              className="w-full h-4 appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleMuteToggle}
            className="text-white hover:text-gray-200 transition-colors p-1"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {getVolumeIcon()}
          </button>
          
          {/* Volume Slider */}
          <div className="relative w-32">
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
          
          <span className="text-white text-sm font-mono w-12 text-right">
            {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;