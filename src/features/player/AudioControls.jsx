import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, setCurrentTime } from './playerSlice';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const AudioControls = () => {
  const dispatch = useDispatch();
  const { isPlaying, currentTime } = useSelector((state) => state.player);

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-wood rounded-lg">
      <button className="p-2 hover:bg-wood-light rounded-full transition">
        <SkipBack className="text-paper-light" size={24} />
      </button>
      
      <button 
        onClick={() => dispatch(togglePlay())}
        className="p-4 bg-gold hover:bg-yellow-500 rounded-full transition"
      >
        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
      </button>
      
      <button className="p-2 hover:bg-wood-light rounded-full transition">
        <SkipForward className="text-paper-light" size={24} />
      </button>
    </div>
  );
};

export default AudioControls;
