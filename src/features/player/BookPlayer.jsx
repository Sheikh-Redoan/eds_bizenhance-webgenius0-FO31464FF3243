import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from './playerSlice';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage bg-paper-light border-r border-paper-dark shadow-inner p-8 h-full relative" ref={ref}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
      <div className="relative z-10 h-full">
        {props.children}
      </div>
    </div>
  );
});

const BookPlayer = () => {
  const dispatch = useDispatch();
  const { currentSong, currentPageIndex } = useSelector((state) => state.player);
  const bookRef = useRef();

  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(currentPageIndex);
    }
  }, [currentPageIndex]);

  if (!currentSong) return <div className="text-center text-paper-light">Loading Book...</div>;

  return (
    <div className="flex justify-center items-center h-[600px] w-full bg-wood-dark p-10 overflow-hidden">
      <HTMLFlipBook 
        width={450} 
        height={600} 
        showCover={true}
        className="shadow-2xl"
        ref={bookRef}
        onFlip={(e) => dispatch(setPage(e.data))}
      >
        <Page>
          <div className="flex flex-col items-center justify-center h-full text-wood-dark">
            <h1 className="font-medieval text-5xl mb-4">{currentSong.title}</h1>
            <img src={currentSong.coverUrl} className="w-64 h-64 object-cover border-4 border-wood rounded-lg" alt="cover" />
          </div>
        </Page>

        {currentSong.pages.map((page, index) => (
          <Page key={index}>
            {page.type === 'lyrics' && (
              <div className="space-y-6 text-center mt-10">
                {page.lines.map((line, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-gray-500 text-sm italic">{line.en}</p>
                    <p className="text-wood-dark text-xl font-bold font-medieval">{line.target}</p>
                  </div>
                ))}
              </div>
            )}
            
            {page.type === 'vocab' && (
              <div className="text-left p-4">
                <h2 className="font-medieval text-3xl mb-6 text-center">Key Vocabulary</h2>
                {page.words.map((vocab, k) => (
                  <div key={k} className="bg-wood-light/20 p-3 mb-3 rounded border border-wood-light">
                    <span className="font-bold text-wood-dark">{vocab.word}</span> 
                    <span className="text-sm"> → {vocab.translation}</span>
                    <p className="text-xs italic mt-1 text-gray-600">"{vocab.context}"</p>
                  </div>
                ))}
                <button className="w-full mt-8 bg-wood hover:bg-wood-light text-paper font-medieval py-2 rounded">
                  Start Quiz
                </button>
              </div>
            )}
          </Page>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default BookPlayer;
