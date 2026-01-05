/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setCurrentTime, setDuration, setIsPlaying } from './playerSlice';
import AudioControls from './AudioControls';

// Styles from the demo adapted for React


const BookPlayer = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, currentTime, currentPageIndex, autoFlip } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [sheets, setSheets] = useState([]);

  // Process song data into sheets (Front/Back pairs)
  useEffect(() => {
    if (!currentSong) return;

    // Flatten pages from mock data into a linear array to map to Book Sheets
    // Assuming currentSong.pages is an array of content objects
    const contentPages = currentSong.pages || [];
    const generatedSheets = [];
    
    // Create Cover Sheet (Sheet 0)
    // Front: Cover Art, Back: Dedication/Empty
    generatedSheets.push({
      index: 0,
      front: { type: 'cover_art', data: currentSong },
      back: { type: 'dedication', data: null }
    });

    // Create Content Sheets
    // Map content pages to front/back of subsequent sheets
    for (let i = 0; i < contentPages.length; i += 2) {
      const sheetIndex = Math.floor(i / 2) + 1;
      generatedSheets.push({
        index: sheetIndex,
        front: contentPages[i] || { type: 'empty' },
        back: contentPages[i + 1] || { type: 'empty' }
      });
    }

    setSheets(generatedSheets);
  }, [currentSong]);

  // Handle Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Playback failed", e);
          dispatch(setIsPlaying(false));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, dispatch]);

  // Audio Events
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      dispatch(setCurrentTime(time));
      
      // Auto-flip logic
      if (autoFlip && currentSong) {
        // Find the page containing the current lyric
        // This requires searching through all pages to find the active lyric time
        let targetPageIndex = -1;
        
        currentSong.pages.forEach((page, pIndex) => {
          if (page.type === 'lyrics' && page.lines) {
            const hasActiveLine = page.lines.some(line => 
              time >= line.time && time < (line.endTime || line.time + 5) // Simplified duration logic
            );
            // If this page has the active line, we need to show it
            if (hasActiveLine) {
               // Calculate which sheet index this page belongs to
               // Pages in data: 0, 1, 2...
               // Sheets: Cover(0), Sheet1(Page0-Front, Page1-Back), Sheet2(Page2-Front...)
               // Actually, let's align with the loop above:
               // contentPages[0] is on Sheet 1 Front.
               // contentPages[1] is on Sheet 1 Back.
               // contentPages[2] is on Sheet 2 Front.
               // So: Sheet Index = Math.floor(pIndex / 2) + 1
               targetPageIndex = Math.floor(pIndex / 2) + 1;
            }
          }
        });

        // Determine if we need to be on the left (flipped) or right
        // If targetPageIndex is found, we should ensure sheets up to that index are flipped?
        // Actually, if content is on Sheet 1 Front (Right side), Sheet 0 should be flipped (Cover open).
        // If content is on Sheet 1 Back (Left side), Sheet 1 should be flipped.
        
        if (targetPageIndex !== -1) {
             // Logic: To see Sheet X Front, we need Sheet X-1 Flipped.
             // To see Sheet X Back, we need Sheet X Flipped.
             // For simplicity in this demo, we just flip to the sheet index.
             if (currentPageIndex !== targetPageIndex) {
                 // Don't flip wildly; precise logic would go here
             }
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
      if (!isPlaying) dispatch(setIsPlaying(true));
    }
  };

  const flipToSheet = (index) => {
    dispatch(setPage(index));
  };

  // Helper to render content
  const renderContent = (content) => {
    if (!content) return null;

    if (content.type === 'cover_art') {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 ">
           <h1 className="text-7xl font-serif mb-4 font-bold text-white text-shadow-2xl">{content.data.title}</h1>
           <p className="text-3xl text-white italic mb-8">{content.data.artist}</p>
           {content.data.coverUrl && <img src={content.data.coverUrl} className="w-60 h-60 object-cover rounded-full border-2 border-black shadow-2xl" alt="Cover" />}
           <div className="mt-12 text-amber-400 opacity-50 text-sm animate-pulse">
              Click to Open
           </div>
        </div>
      );
    }

    if (content.type === 'dedication') {
        return (
            <div className="h-full flex items-center justify-center text-gray-500 italic">
                <p>Enjoy the music...</p>
            </div>
        );
    }

    if (content.type === 'lyrics') {
      return (
        <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-amber-900 mb-6 font-serif opacity-50">Lyrics</h3>
            {content.lines.map((line, idx) => {
                const isActive = currentTime >= line.time && currentTime < (content.lines[idx+1]?.time || line.time + 10);
                return (
                    <div 
                        key={idx} 
                        className={`lyric-line ${isActive ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleSeek(line.time); }}
                    >
                        <p className="text-xs text-gray-500 italic">{line.en}</p>
                        <p className="text-lg text-amber-900 font-serif">{line.target}</p>
                    </div>
                );
            })}
        </div>
      );
    }

    if (content.type === 'vocab') {
        return (
            <div className="text-left p-2">
                <h2 className="font-serif text-3xl mb-6 text-center text-amber-900 opacity-70">Vocabulary</h2>
                {content.words.map((vocab, k) => (
                  <div key={k} className="bg-orange-50/50 p-3 mb-3 rounded border-b border-orange-200">
                    <span className="font-bold text-amber-900 text-lg">{vocab.word}</span> 
                    <span className="text-sm text-gray-600"> → {vocab.translation}</span>
                    <p className="text-xs italic mt-1 text-gray-500">"{vocab.context}"</p>
                  </div>
                ))}
            </div>
        );
    }

    return <div className="flex items-center justify-center h-full text-4xl text-gray-300">~</div>;
  };

  if (!currentSong) return <div className="min-h-screen flex items-center justify-center text-amber-100 bg-gray-900">Loading Book...</div>;

  return (
    <div className="book-container w-full min-h-screen flex flex-col items-center justify-center relative">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => dispatch(setIsPlaying(false))}
        preload="auto"
      />

      {/* 3D Book Stage */}
      <div id="book-stage">
        {sheets.map((sheet, idx) => {
            // Z-index logic: Earlier pages need higher z-index when stacked on right
            // When flipped, they need higher z-index on left.
            const zIndex = idx === currentPageIndex ? 10 : (50 - Math.abs(currentPageIndex - idx));
            const isFlipped = idx <= currentPageIndex - 1; // If current index is 1, sheet 0 is flipped.

            return (
                <div 
                    key={idx} 
                    className={`page ${isFlipped ? 'flipped' : ''}`}
                    style={{ zIndex: isFlipped ? idx : 50 - idx }}
                    onClick={() => flipToSheet(isFlipped ? idx : idx + 1)}
                >
                    <div className={`front ${sheet.front.type === 'cover_art' ? 'cover-front' : ''}`}>
                        {renderContent(sheet.front)}
                        <div className="absolute bottom-4 right-6 text-gray-400 text-xs italic">{idx * 2 + 1}</div>
                    </div>
                    <div className={`back ${sheet.back.type === 'cover_art' ? 'cover-back' : ''}`}>
                        {renderContent(sheet.back)}
                        <div className="absolute bottom-4 left-6 text-gray-400 text-xs italic">{idx * 2 + 2}</div>
                    </div>
                </div>
            );
        })}
      </div>

      {/* Embedded Player Controls */}
      <AudioControls audioRef={audioRef} />
    </div>
  );
};

export default BookPlayer;