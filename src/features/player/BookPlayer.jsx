/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';
import { setSong, setPage, setCurrentTime, setDuration, setIsPlaying } from './playerSlice';
import { useGetSongDetailsQuery } from '../../redux/api/contentApi';
import AudioControls from './AudioControls';
import Button from '../../components/ui/Button';
import buttonBG from "../../assets/images/QuizButtonBG.png"
import topicon from "../../assets/icons/top-icon.png"
import pageBG from "../../assets/images/pageBG.png"
import pageBGreverse from "../../assets/images/pageBGrevarce.png"
import pageBGCover from "../../assets/images/pageBGCover2.png"

const BookPlayer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songId } = useParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { currentSong, isPlaying, currentTime, currentPageIndex } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [sheets, setSheets] = useState([]);
  const [mobilePages, setMobilePages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const { data: songDetails, isLoading } = useGetSongDetailsQuery(songId);

  // Transform API data to song format
  useEffect(() => {
    if (songDetails?.data) {
      const apiData = songDetails.data;

      const formattedLyrics = (apiData.lyrics || []).map(l => ({
        time: parseFloat(l.duration?.start_time || 0),
        endTime: parseFloat(l.duration?.end_time || 0),
        en: l.eng_lang,
        target: l.other_lang
      })).sort((a, b) => a.time - b.time);

      const formattedVocab = (apiData.vocabularies || []).map(v => ({
        word: v.word,
        translation: v.meaning,
        context: v.example
      }));

      const pages = [];
      const LINES_PER_PAGE = 6;
      
      for (let i = 0; i < formattedLyrics.length; i += LINES_PER_PAGE) {
        const pageLines = formattedLyrics.slice(i, i + LINES_PER_PAGE);
        const lastLine = pageLines[pageLines.length - 1];
        const firstLine = pageLines[0];
        
        pages.push({
          type: 'lyrics',
          lines: pageLines,
          startTime: firstLine ? firstLine.time : 0,
          endTime: lastLine ? lastLine.endTime : 0
        });
      }

      const WORDS_PER_PAGE = 6;
      for (let i = 0; i < formattedVocab.length; i += WORDS_PER_PAGE) {
        pages.push({
          type: 'vocab',
          words: formattedVocab.slice(i, i + WORDS_PER_PAGE)
        });
      }

      if (isAuthenticated && apiData.quiz_questions && apiData.quiz_questions.length > 0) {
        pages.push({
          type: 'exercise_prompt',
          content: {
            title: "Test Your Knowledge",
            description: "Ready to check what you've learned?",
            buttonText: "Start Exercises"
          }
        });
      }

      const fullSongObject = {
        id: apiData.id.toString(),
        title: apiData.title,
        artist: apiData.artist?.name,
        audioUrl: apiData.audio,
        coverUrl: apiData.image,
        pages: pages,
        exercise: apiData.quiz_questions && apiData.quiz_questions.length > 0,
        quiz: apiData.quiz_questions
      };

      dispatch(setSong(fullSongObject));
    }
  }, [songDetails, dispatch]);

  // Protect songs for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated && parseInt(songId) !== 1) {
      navigate('/membership');
    }
  }, [songId, isAuthenticated, navigate]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Process song data into sheets
  useEffect(() => {
    if (!currentSong) return;

    const contentPages = currentSong.pages || [];
    const generatedSheets = [];
    
    // Create Cover Sheet (Sheet 0)
    generatedSheets.push({
      index: 0,
      front: { type: 'cover_art', data: currentSong },
      back: { type: 'dedication', data: null }
    });

    // Create Content Sheets
    for (let i = 0; i < contentPages.length; i += 2) {
      const sheetIndex = Math.floor(i / 2) + 1;
      generatedSheets.push({
        index: sheetIndex,
        front: contentPages[i] || { type: 'empty' },
        back: contentPages[i + 1] || { type: 'empty' }
      });
    }

    setSheets(generatedSheets);

    // Create Linear Mobile Pages
    const generatedMobilePages = [];
    generatedMobilePages.push({ type: 'cover_art', data: currentSong });
    generatedMobilePages.push({ type: 'dedication', data: null });
    generatedMobilePages.push(...contentPages);
    setMobilePages(generatedMobilePages);
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
    const maxIndex = isMobile ? mobilePages.length : sheets.length;
    if (index >= 0 && index < maxIndex) {
      dispatch(setPage(index));
    }
  };

  const handleStartExercise = () => {
    dispatch(setIsPlaying(false));
    navigate(`/exercise/${currentSong.id}`);
  };

  const handleAudioEnded = () => {
    dispatch(setIsPlaying(false));

    // Force flip to exercise page when audio completely finishes
    if (!isMobile) {
      const exerciseSheetIndex = sheets.findIndex(s => s.front.type === 'exercise_prompt' || s.back.type === 'exercise_prompt');
      if (exerciseSheetIndex !== -1) {
        const targetPageIndex = sheets[exerciseSheetIndex].front.type === 'exercise_prompt' 
          ? exerciseSheetIndex 
          : exerciseSheetIndex + 1;
        dispatch(setPage(targetPageIndex));
      }
    } else {
      const exercisePageIndex = mobilePages.findIndex(p => p.type === 'exercise_prompt');
      if (exercisePageIndex !== -1) {
        dispatch(setPage(exercisePageIndex));
      }
    }
  };

  // Auto-flip pages based on current time
  useEffect(() => {
    if (!currentSong || !isPlaying) return;

    if (isMobile) {
      if (!mobilePages.length) return;

      const activeMobileIndex = mobilePages.findIndex(page => 
        page.type === 'lyrics' && 
        page.startTime !== undefined &&
        currentTime >= page.startTime && 
        currentTime <= page.endTime
      );

      if (activeMobileIndex !== -1 && activeMobileIndex !== currentPageIndex) {
        dispatch(setPage(activeMobileIndex));
      } else if (activeMobileIndex === -1) {
        // MOBILE FIX: Automatically flip to exercise when lyrics end
        let lastLyricEndTime = 0;
        mobilePages.forEach(page => {
          if (page.type === 'lyrics' && page.endTime) {
            lastLyricEndTime = Math.max(lastLyricEndTime, page.endTime);
          }
        });

        if (currentTime > lastLyricEndTime && lastLyricEndTime > 0) {
          const exerciseIndex = mobilePages.findIndex(p => p.type === 'exercise_prompt');
          if (exerciseIndex !== -1 && currentPageIndex !== exerciseIndex) {
            dispatch(setPage(exerciseIndex));
          }
        }
      }
    } else {
      if (!sheets.length) return;

      let activeIndexFound = false;

      for (let i = 1; i < sheets.length; i++) {
        const sheet = sheets[i];

        if (sheet.front.type === 'lyrics' && sheet.front.startTime !== undefined) {
          if (currentTime >= sheet.front.startTime && currentTime <= sheet.front.endTime) {
            if (currentPageIndex !== i) {
              dispatch(setPage(i));
            }
            activeIndexFound = true;
            return;
          }
        }

        if (sheet.back.type === 'lyrics' && sheet.back.startTime !== undefined) {
          if (currentTime >= sheet.back.startTime && currentTime <= sheet.back.endTime) {
            if (currentPageIndex !== i + 1) {
              dispatch(setPage(i + 1));
            }
            activeIndexFound = true;
            return;
          }
        }
      }

      // DESKTOP FIX: If no active lyrics found, check if song passed the last lyric
      if (!activeIndexFound) {
        let lastLyricEndTime = 0;
        sheets.forEach(sheet => {
          if (sheet.front.type === 'lyrics' && sheet.front.endTime) {
            lastLyricEndTime = Math.max(lastLyricEndTime, sheet.front.endTime);
          }
          if (sheet.back.type === 'lyrics' && sheet.back.endTime) {
            lastLyricEndTime = Math.max(lastLyricEndTime, sheet.back.endTime);
          }
        });

        // If current time is past the final lyric, flip to the exercise page
        if (currentTime > lastLyricEndTime && lastLyricEndTime > 0) {
          const exerciseSheetIndex = sheets.findIndex(s => s.front.type === 'exercise_prompt' || s.back.type === 'exercise_prompt');
          
          if (exerciseSheetIndex !== -1) {
            // Determine exactly which page index shows the exercise prompt
            const targetPageIndex = sheets[exerciseSheetIndex].front.type === 'exercise_prompt' 
              ? exerciseSheetIndex 
              : exerciseSheetIndex + 1;

            // Flip only if we aren't already on that page
            if (currentPageIndex !== targetPageIndex) {
              dispatch(setPage(targetPageIndex));
            }
          }
        }
      }
    }
  }, [currentTime, isPlaying, sheets, mobilePages, currentPageIndex, dispatch, isMobile, currentSong]);

  // Render content for mobile
  const renderMobileContent = (content, isFront = true) => {
    if (!content) return null;

    if (content.type === 'cover_art') {
      return (
        <div className="cover-mobile flex flex-col items-center justify-center h-full w-full">
          <h1 className="cover-title-mobile">{content.data.title}</h1>
          <p className="cover-artist-mobile">{content.data.artist}</p>
          {content.data.coverUrl && (
            <img 
              src={content.data.coverUrl} 
              className="cover-image-mobile" 
              alt="Cover" 
            />
          )}
          <div className="text-amber-600 mt-auto text-sm animate-pulse pb-4">
            Swipe or use arrows to navigate
          </div>
        </div>
      );
    }

    if (content.type === 'dedication') {
      return (
        <div className="flex items-center justify-center h-full text-gray-600 italic text-center p-4">
          <p>Enjoy the music and language journey...</p>
        </div>
      );
    }

    if (content.type === 'lyrics') {
      return (
        <div className="flex flex-col h-full w-full">
          <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif text-center shrink-0">
            Lyrics
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-4 pb-4">
              {content.lines.map((line, idx) => {
                const isActive = currentTime >= line.time && currentTime < (content.lines[idx+1]?.time || line.endTime + 1);
                return (
                  <div 
                    key={idx} 
                    className={`lyric-line-mobile ${isActive ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleSeek(line.time); }}
                  >
                    <div className="english">{line.en}</div>
                    <div className="target">{line.target}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (content.type === 'vocab') {
      return (
        <div className="flex flex-col h-full w-full">
          <h2 className="text-xl font-bold text-amber-900 mb-4 text-center shrink-0">
            Vocabulary
          </h2>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2" style={{ maxHeight: currentSong.exercise ? 'calc(100% - 100px)' : '100%' }}>
            <div className="space-y-3 pb-4">
              {content.words.map((vocab, k) => (
                <div key={k} className="vocab-card-mobile">
                  <div className="vocab-word">{vocab.word}</div>
                  <div className="vocab-translation">→ {vocab.translation}</div>
                  <div className="vocab-context">"{vocab.context}"</div>
                </div>
              ))}
            </div>
          </div>

          {currentSong.exercise && (
            <div className="mt-4 pt-4 border-t border-amber-900/20 shrink-0 relative z-50">
              <button
                className="quiz-button-mobile relative z-50"
                style={{
                  backgroundImage:`url(${buttonBG})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartExercise();
                }}
              >
                <img src={topicon} alt="" className="w-5 h-5" />
                <span>Start Exercise</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    if (content.type === 'exercise_prompt') {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 relative z-50">
          <div className="mb-6">
            <h2 className="text-2xl font-serif text-amber-900 mb-3">{content.content.title}</h2>
            <p className="text-lg text-stone-700 font-serif italic">{content.content.description}</p>
          </div>
          <button
            className="quiz-button-mobile relative z-50"
            style={{
              backgroundImage:`url(${buttonBG})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleStartExercise();
            }}
          >
            <img src={topicon} alt="" className="w-5 h-5" />
            <span>{content.content.buttonText}</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full text-2xl text-gray-400">
        ~
      </div>
    );
  };

  // Render content for desktop (3D book)
  const renderDesktopContent = (content, isFront = true) => {
    if (!content) return null;

    if (content.type === 'cover_art') {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-4 font-bold text-white text-shadow-2xl">
            {content.data.title}
          </h1>
          <p className="text-2xl md:text-3xl text-white italic mb-8">
            {content.data.artist}
          </p>
          {content.data.coverUrl && (
            <img 
              src={content.data.coverUrl} 
              className="w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 object-cover rounded-full border-2 border-black shadow-2xl" 
              alt="Cover" 
            />
          )}
          <div className="mt-8 md:mt-12 text-amber-400 opacity-50 text-sm animate-pulse">
            Click to Open
          </div>
        </div>
      );
    }

    if (content.type === 'dedication') {
      return (
        <div className="h-full flex items-center justify-center text-gray-500 italic text-lg">
          <p>Enjoy the music...</p>
        </div>
      );
    }

    if (content.type === 'lyrics') {
      return (
        <div className="flex-1 flex flex-col justify-center p-2 md:p-4">
          <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-4 md:mb-6 font-serif opacity-50">
            Lyrics
          </h3>
          <div className="space-y-2 md:space-y-3 overflow-y-auto max-h-[55vh]">
            {content.lines.map((line, idx) => {
              const isActive = currentTime >= line.time && currentTime < (content.lines[idx+1]?.time || line.endTime + 1);
              return (
                <div 
                  key={idx} 
                  className={`lyric-line ${isActive ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleSeek(line.time); }}
                >
                  <p className="text-sm md:text-base text-gray-500">{line.en}</p>
                  <p className="text-base md:text-lg text-amber-900 font-serif">{line.target}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (content.type === 'vocab') {
      return (
        <div className="text-left p-2 md:p-3 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl mb-4 md:mb-5 lg:mb-6 text-center text-amber-900 opacity-70">
              Vocabulary
            </h2>
            {content.words.map((vocab, k) => (
              <div key={k} className="vocab-card">
                <span className="font-bold text-amber-900 text-base md:text-lg">
                  {vocab.word}
                </span> 
                <span className="text-sm md:text-base text-gray-600 ml-2">
                  → {vocab.translation}
                </span>
                <p className="text-xs md:text-sm italic mt-1 text-gray-500">
                  "{vocab.context}"
                </p>
              </div>
            ))}
          </div>

        </div>
      );
    }

    if (content.type === 'exercise_prompt') {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-transparent to-black/10">
                <div className="mb-8">
                    <h2 className="text-4xl font-serif text-amber-900 mb-4">{content.content.title}</h2>
                    <p className="text-xl text-stone-700 font-serif italic">{content.content.description}</p>
                </div>

                 <Button 
                className="text-base md:text-lg font-Merriweather p-6 md:p-8 lg:p-10 flex items-center gap-2 text-white w-full max-w-[200px] md:max-w-[220px] lg:max-w-[250px] text-center justify-center transform hover:scale-105 transition-transform"
                style={{backgroundImage: `url(${buttonBG})`, backgroundSize: 'contain'}}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartExercise();
                }}
              >
                <img src={topicon} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                {content.content.buttonText}
              </Button>
            </div>
        );
    }

    return (
      <div className="flex items-center justify-center h-full text-3xl md:text-4xl text-gray-300">
        ~
      </div>
    );
  };

  if (isLoading || !currentSong) {
    return (
      <div className="loading-book">
        <div className="loading-spinner"></div>
        <p>Loading Book & Audio...</p>
      </div>
    );
  }

  return (
    <div className="book-container">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {/* Audio Controls - positioned differently for mobile/desktop */}
      <AudioControls audioRef={audioRef} />

      {/* Mobile Interface */}
      {isMobile ? (
        <>
          {/* Page Indicator */}
          <div className="page-indicator">
            Page {currentPageIndex + 1} of {mobilePages.length}
          </div>

          {/* Navigation Arrows */}
          <div className="mobile-navigation">
            {currentPageIndex > 0 && (
              <button 
                className="nav-button"
                onClick={() => flipToSheet(currentPageIndex - 1)}
                aria-label="Previous page"
              >
                ←
              </button>
            )}
            {currentPageIndex < mobilePages.length - 1 && (
              <button 
                className="nav-button"
                onClick={() => flipToSheet(currentPageIndex + 1)}
                aria-label="Next page"
              >
                →
              </button>
            )}
          </div>

          {/* Swipe Areas for Touch Navigation */}
          <div 
            className="swipe-area swipe-left"
            onClick={() => currentPageIndex > 0 && flipToSheet(currentPageIndex - 1)}
          />
          <div 
            className="swipe-area swipe-right"
            onClick={() => currentPageIndex < mobilePages.length - 1 && flipToSheet(currentPageIndex + 1)}
          />

          {/* Current Page Content */}
          <div 
            className="page-mobile"
            style={{
              backgroundImage: `url(${pageBG})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'transparent'
            }}
          >
            {mobilePages[currentPageIndex] && renderMobileContent(
              mobilePages[currentPageIndex], 
              true
            )}
          </div>
        </>
      ) : (
        /* Desktop 3D Book Interface */
        <>
          <div 
            id="book-stage"
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              perspective: '1500px'
            }}
          >
            {sheets.map((sheet, idx) => {
              const zIndex = idx === currentPageIndex ? 10 : (50 - Math.abs(currentPageIndex - idx));
              const isFlipped = idx <= currentPageIndex - 1;

              return (
                <div 
                  key={idx} 
                  className={`page ${isFlipped ? 'flipped' : ''}`}
                  style={{ 
                    zIndex: isFlipped ? idx : 50 - idx,
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d'
                  }}
                  onClick={() => flipToSheet(isFlipped ? idx : idx + 1)}
                >
                  <div 
                    className={`front ${sheet.front.type === 'cover_art' ? 'cover-front' : ''}`}
                    style={{
                      backgroundImage: sheet.front.type === 'cover_art' ? `url(${pageBGCover})` : `url(${pageBGreverse})`,
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'Transparent',
                      willChange: 'transform, opacity',
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d'
                    }}
                  >
                    {renderDesktopContent(sheet.front, true)}
                    <div className="page-number right">
                      {idx * 2 + 1}
                    </div>
                  </div>
                  <div 
                    className={`back ${sheet.back.type === 'cover_art' ? 'cover-back' : ''}`}
                    style={{
                      backgroundImage: sheet.back.type === 'cover_art' ? 'none' : `url(${pageBG})`,
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: sheet.back.type === 'cover_art' ? '#4a3b2a' : 'white',
                      willChange: 'transform, opacity',
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d'
                    }}
                  >
                    {renderDesktopContent(sheet.back, false)}
                    <div className="page-number left">
                      {idx * 2 + 2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BookPlayer;