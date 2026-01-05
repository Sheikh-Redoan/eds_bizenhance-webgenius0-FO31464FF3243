/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { startQuiz, selectAnswer, nextQuestion, resetQuiz } from './quizSlice';
import { ENHANCED_SONGS } from '../../data/mockSongs';
import './Quiz.css';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import buttonBG from "../../assets/images/QuizButtonBG.png";
import resultBg from '../../assets/images/resultbord.png';
import dashboardButton from '../../assets/images/DashboardbuttonBG.png'
import moresongbgbutton from '../../assets/images/moreSongs.png'
const Quiz = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    questions,
    currentQuestionIndex,
    score,
    isComplete,
    selectedAnswerIndex,
    isAnswered,
    isCorrect
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    const song = ENHANCED_SONGS.find(s => s.id === songId);
    if (song && song.quiz) {
      dispatch(startQuiz(song.quiz));
    } else {
      navigate('/dashboard');
    }
  }, [songId, dispatch, navigate]);

  const currentQuestion = questions[currentQuestionIndex];
  const songData = ENHANCED_SONGS.find(s => s.id === songId);

  const getLetter = (index) => String.fromCharCode(65 + index);

  if (!currentQuestion && !isComplete) return <div className="text-white text-center mt-20">Loading Quiz...</div>;

  // --- RESULT VIEW ---
  if (isComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex justify-center items-center"
        style={{height: 'calc(100vh - 82px)'}}
      >
        <div className="w-[524px] h-[670px] relative bg-transparent scale-90 sm:scale-100">
          <div className="left-[65.50px] top-0 absolute inline-flex flex-col justify-start items-center gap-4 w-[393px]">
            <div className="self-stretch text-center justify-center text-white text-5xl font-normal font-OldLondon leading-[52.80px]">
              {songData?.title}
            </div>
            <div className="justify-center text-white text-xl font-normal font-Merriweather leading-6 text-center">
              {songData?.description}
            </div>
          </div>

          {/* <img className="w-[524px] h-[541px] left-0 top-[129px] absolute rounded-xl object-cover opacity-20 bg-black" src={songData?.coverUrl}  alt="Background" /> */}
          <div className="w-[524px] h-[541px] left-0 top-[129px] absolute " style={{backgroundImage: `url(${resultBg})`}} />

          <div className="w-full text-center top-[159px] absolute justify-center text-white text-3xl font-bold font-Merriweather leading-10 z-10">
            Quiz Complete!
          </div>

          <div className="w-56 left-[149px] top-[267px] absolute inline-flex flex-col justify-start items-center gap-6 z-10">
            <div className="self-stretch text-center justify-center text-white text-8xl font-bold font-Merriweather">
              {score}/{questions.length}
            </div>
            <div className="self-stretch text-center justify-center text-white text-3xl font-normal font-Merriweather leading-10 w-max">
              {score === questions.length ? "Perfect!" : "Keep Practicing!"}
            </div>
          </div>

          <div className="w-96 left-[65px] top-[527px] absolute inline-flex justify-start items-center gap-6 z-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 h-20 relative overflow-hidden cursor-pointer group"
              onClick={() => navigate('/dashboard')}
            >
              <div className="absolute inset-0 flex items-center justify-center text-center text-white text-base font-normal font-Merriweather leading-4" style={{backgroundImage: `url(${dashboardButton})`}}>
                View Dashboard
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 h-20 relative overflow-hidden cursor-pointer group"
              onClick={() => {
                const song = ENHANCED_SONGS.find(s => s.id === songId);
                dispatch(resetQuiz());
                if (song && song.quiz) {
                  dispatch(startQuiz(song.quiz));
                }
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-center text-stone-800 text-base font-normal font-Merriweather leading-4" style={{ backgroundImage:`url(${moresongbgbutton})`}}>
                Try Again
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- QUESTION VIEW ---
  return (
    <div className="flex flex-col justify-start items-center pt-20 gap-7 overflow-x-hidden" style={{height: 'calc(100vh - 82px)'}}>
      
      {/* Header Info */}
      <div className="flex flex-col justify-start items-center gap-4 z-10">
        <div className="self-stretch text-center justify-center text-white text-5xl font-normal font-OldLondon leading-[52.80px]">
          {songData?.title}
        </div>
        <div className="justify-center text-white text-xl font-normal font-Merriweather leading-6">
          {songData?.description}
        </div>
      </div>

      {/* Progress Bar & Stats */}
      <div className="w-[900px] flex flex-col justify-start items-start gap-2.5 z-10">
        <div className="self-stretch inline-flex justify-between items-center">
          {/* Using a thick green progress bar as seen in the image */}
          <div className="w-full h-4 bg-stone-700/50 relative overflow-hidden">
             <motion.div 
               className="h-full bg-[#4CAF50]"
               initial={{ width: 0 }}
               animate={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
             />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="w-[900px] relative min-h-[400px]">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col justify-start items-start gap-5 w-full"
          >
            {/* Question Text */}
            <div className={`self-stretch justify-center text-white text-4xl font-normal leading-10 ${isAnswered ? "font-['Crimes_Times_Six']" : "font-MetalMania"}`}>
              {currentQuestion.question}
            </div>

            {/* Options List */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrectOption = idx === currentQuestion.correctAnswer;
                
                // --- Color Logic matching the designs ---
                // Default: Gray bg, Gray text
                let containerStyle = "bg-[#F5F5F5] hover:bg-stone-200";
                let letterBoxStyle = "bg-[#E0E0E0] text-[#8B7355]"; // Beige/Gray letter box
                let textStyle = "text-[#6B5B4E]"; // Brownish gray text
                
                if (isAnswered) {
                  if (isSelected) {
                    if (isCorrect) {
                      // CORRECT STATE (Image 2): Gold/Brown background
                      containerStyle = "bg-[#A98057] shadow-lg"; 
                      letterBoxStyle = "bg-[#C4A480] text-white"; // Lighter brown box
                      textStyle = "text-white font-bold";
                    } else {
                      // WRONG STATE (Image 1): Terracotta/Orange background
                      containerStyle = "bg-[#C05F3C] shadow-lg"; 
                      letterBoxStyle = "bg-[#D27A5B] text-white"; // Lighter orange box
                      textStyle = "text-white font-bold";
                    }
                  } else {
                    // Not selected, result shown -> dim it
                    containerStyle = "bg-[#F5F5F5] opacity-50"; 
                  }
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => !isAnswered && dispatch(selectAnswer(idx))}
                    className={`
                      relative w-full h-[72px] flex justify-between items-center 
                      cursor-pointer transition-colors duration-300 overflow-hidden
                      ${containerStyle}
                    `}
                  >
                    <div className="flex items-center gap-4 h-full pl-3">
                      {/* Letter Box */}
                      <div className={`
                        size-12 flex justify-center items-center 
                        text-xl font-bold font-Inter transition-colors duration-300
                        ${letterBoxStyle}
                      `}>
                        {getLetter(idx)}
                      </div>

                      {/* Text */}
                      <div className={`text-lg font-semibold font-Inter transition-colors duration-300 ${textStyle}`}>
                        {option}
                      </div>
                    </div>

                    {/* Right Side Status Icon Box (The Square on the right) */}
                    {isAnswered && isSelected && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`
                          h-full w-[72px] flex justify-center items-center
                          border-l-2 border-white/20
                        `}
                      >
                         {isCorrect ? <Check size={40} className="text-white" /> : <X size={40} className="text-white" />}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Question Button */}
      <div className="h-24 w-full flex justify-center items-center mt-4">
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-[900px] flex justify-center items-center"
            >
              <div
                className="w-80 h-14 relative cursor-pointer group"
                onClick={() => dispatch(nextQuestion())}
              >
                {/* Custom Image Background Button */}
                <div 
                  className="absolute inset-0 flex justify-center items-center z-10 bg-contain bg-no-repeat bg-center transition-transform duration-300 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${buttonBG})` }}
                >
                  <span className="text-orange-100 text-lg font-normal font-Merriweather pt-1">
                    {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;