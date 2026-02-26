/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { startQuiz, selectAnswer, nextQuestion, resetQuiz } from "./quizSlice";
import {
  useGetSongDetailsQuery,
  useGetFunFactsQuery,
} from "../../redux/api/contentApi";
import { useSubmitQuizMutation } from "../../redux/api/userApi";
import "./Quiz.css";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import buttonBG from "../../assets/images/QuizButtonBG.png";
import resultBg from "../../assets/images/resultbord.png";
import dashboardButton from "../../assets/images/DashboardbuttonBG.png";
import moresongbgbutton from "../../assets/images/moreSongs.png";
import bulb from "../../assets/images/Knowledge Nugget Icon.png";
const Quiz = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: songDetails } = useGetSongDetailsQuery(songId);
  const [submitQuiz] = useSubmitQuizMutation();
  const { data: funFactsResponse } = useGetFunFactsQuery();
  const [randomFact, setRandomFact] = useState(null);

  const {
    questions,
    currentQuestionIndex,
    score,
    isComplete,
    selectedAnswerIndex,
    isAnswered,
    isCorrect,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (songDetails?.data?.quiz_questions && questions.length === 0) {
      const apiQuestions = songDetails.data.quiz_questions;

      const formattedQuestions = apiQuestions.map((q) => {
        const correctIndex = q.quiz_options.findIndex((opt) => opt.is_correct);

        return {
          id: q.id,
          question: q.question,
          options: q.quiz_options.map((opt) => ({
            id: opt.id,
            text: opt.option_text,
          })),
          correctAnswer: correctIndex,
        };
      });

      if (formattedQuestions.length > 0) {
        dispatch(startQuiz(formattedQuestions));
      }
    }
  }, [songDetails, dispatch, questions.length]);

  useEffect(() => {
    if (isComplete && funFactsResponse?.data?.length > 0 && !randomFact) {
      const facts = funFactsResponse.data;
      const randomIndex = Math.floor(Math.random() * facts.length);
      setRandomFact(facts[randomIndex]);
    }
  }, [isComplete, funFactsResponse, randomFact]);

  const currentQuestion = questions[currentQuestionIndex];
  const songData = songDetails?.data
    ? {
        title: songDetails.data.title,
        description: songDetails.data.short_description,
      }
    : null;

  const handleAnswerSelect = (index) => {
    if (!isAnswered) {
      dispatch(selectAnswer(index));

      const selectedOption = currentQuestion.options[index];
      const payload = {
        song_id: songId,
        quiz_question_id: currentQuestion.id,
        quiz_option_id: selectedOption.id,
      };

      submitQuiz(payload)
        .unwrap()
        .then((res) => console.log("Quiz submitted", res))
        .catch((err) => console.error("Quiz submission failed", err));
    }
  };

  const getLetter = (index) => String.fromCharCode(65 + index);

  if (!currentQuestion && !isComplete)
    return <div className="text-white text-center mt-20">Loading Quiz...</div>;

  // --- RESULT VIEW ---
  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center p-4"
        style={{ minHeight: "calc(100vh - 82px)" }}
      >
        <div className="w-full max-w-[524px] h-auto min-h-[670px] relative bg-transparent results-container">
          <div className="w-full px-4 mt-4 results-content">
            <div className="text-center text-white text-3xl md:text-4xl font-bold font-Merriweather leading-10 complete-message-responsive">
              Exercise Complete!
            </div>
          </div>

          <div className="w-full px-4 mt-4 results-bg flex justify-start items-start flex-col">
            <div className="w-56 md:w-64 mx-auto mt-0 md:mt-0 inline-flex flex-col justify-start items-start gap-4 md:gap-6 z-10">
              <div className="self-stretch text-center justify-center text-white score-display-responsive font-bold font-Merriweather text-[50px]!">
                {score}/{questions.length}
              </div>
            </div>

            {/* Fun Fact Section - Animated */}
            <div className="w-full px-4 mt-6 mb-4 fun-fact-container flex flex-col items-center">
              <AnimatePresence>
                {randomFact && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="z-10 w-full max-w-md bg-stone-900/60 p-4 rounded-xl border border-stone-600/50 shadow-xl backdrop-blur-sm"
                  >
                    <img
                      className="w-10 md:w-10 h-auto mb-4 z-10 mx-auto"
                      src={bulb}
                      alt="Knowledge Nugget"
                    />
                    <div className="border-2 border-[#eed191bb]">
                      <h3 className="text-xl flex justify-center items-center md:text-4xl font-bold font-OldLondon text-[#C4A480] text-center mb-2">
                        {randomFact.title}
                      </h3>
                      <div
                        className="text-white text-sm md:text-base font-Merriweather leading-relaxed text-center fun-fact-html-content"
                        dangerouslySetInnerHTML={{
                          __html: randomFact.description,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className=" self-stretch text-center justify-center text-white score-message-responsive font-normal font-Merriweather leading-8 md:leading-10">
            {score === questions.length ? "Perfect!" : "Keep Practicing!"}
          </div>
          <div className="w-full max-w-[384px] mx-auto mt-8 px-4 flex flex-col sm:flex-row justify-center items-center gap-4 results-buttons-container">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[280px] sm:flex-1 h-20 md:h-24 relative overflow-hidden cursor-pointer group results-button"
              onClick={() => navigate("/dashboard")}
            >
              <div
                className="absolute inset-0 flex items-center justify-center text-center text-white dashboard-button-text font-normal font-Merriweather leading-4"
                style={{
                  backgroundImage: `url(${dashboardButton})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                View Dashboard
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[280px] sm:flex-1 h-20 md:h-24 relative overflow-hidden cursor-pointer group results-button"
              onClick={() => {
                dispatch(resetQuiz());
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center text-center text-stone-800 dashboard-button-text font-normal font-Merriweather leading-4"
                style={{
                  backgroundImage: `url(${moresongbgbutton})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
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
    <div
      className="flex flex-col justify-start items-center pt-4 md:pt-20 gap-4 md:gap-7 overflow-x-hidden"
      style={{ minHeight: "calc(100vh - 82px)" }}
    >
      {/* Header Info */}
      <div className="flex flex-col justify-start items-center gap-2 md:gap-4 z-10 quiz-header">
        <div className="self-stretch text-center justify-center text-white title-responsive font-normal font-OldLondon">
          {songData?.title}
        </div>
        <div className="justify-center text-white description-responsive font-normal font-Merriweather leading-5 md:leading-6 text-center px-4">
          {songData?.description}
        </div>
      </div>

      {/* Progress Bar & Stats */}
      <div className="w-[95vw] max-w-[900px] flex flex-col justify-start items-start gap-2.5 z-10 progress-container">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="w-full h-3 md:h-4 bg-stone-700/50 relative overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-[#4CAF50] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="w-[95vw] max-w-[900px] relative min-h-[300px] md:min-h-[400px] question-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col justify-start items-start gap-5 w-full"
          >
            {/* Question Text */}
            <div
              className={`self-stretch justify-center text-white text-2xl md:text-4xl font-normal leading-8 md:leading-10 question-text-responsive font-MetalMania`}
            >
              {currentQuestion.question}
            </div>

            {/* Options List */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3 md:gap-4 options-container">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrectOption = idx === currentQuestion.correctAnswer;

                let containerStyle = "bg-[#F5F5F5] hover:bg-stone-200";
                let letterBoxStyle = "bg-[#E0E0E0] text-[#8B7355]";
                let textStyle = "text-[#6B5B4E]";

                if (isAnswered) {
                  if (isSelected) {
                    if (isCorrect) {
                      containerStyle = "bg-[#A98057] shadow-lg";
                      letterBoxStyle = "bg-[#C4A480] text-white";
                      textStyle = "text-white font-bold";
                    } else {
                      containerStyle = "bg-[#C05F3C] shadow-lg";
                      letterBoxStyle = "bg-[#D27A5B] text-white";
                      textStyle = "text-white font-bold";
                    }
                  } else {
                    containerStyle = "bg-[#F5F5F5] opacity-50";
                  }
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`
                      relative w-full min-h-[56px] md:h-[72px] flex justify-between items-center 
                      cursor-pointer transition-colors duration-300 overflow-hidden option-item
                      ${containerStyle}
                    `}
                  >
                    <div className="flex items-center gap-3 md:gap-4 h-full pl-3 md:pl-4">
                      {/* Letter Box */}
                      <div
                        className={`
                        size-8 md:size-12 flex justify-center items-center letter-box
                        text-base md:text-xl font-bold font-Inter transition-colors duration-300
                        ${letterBoxStyle}
                      `}
                      >
                        {getLetter(idx)}
                      </div>

                      {/* Text */}
                      <div
                        className={`text-sm md:text-lg font-semibold font-Inter transition-colors duration-300 option-text ${textStyle}`}
                      >
                        {option.text}
                      </div>
                    </div>

                    {/* Right Side Status Icon Box */}
                    {isAnswered && isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`
                          h-full w-[50px] md:w-[72px] flex justify-center items-center status-icon-box
                          border-l-2 border-white/20
                        `}
                      >
                        {isCorrect ? (
                          <Check
                            size={32}
                            md:size={40}
                            className="text-white"
                          />
                        ) : (
                          <X size={32} md:size={40} className="text-white" />
                        )}
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
      <div className="h-20 md:h-24 w-full flex justify-center items-center mt-2 md:mt-4">
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-[95vw] max-w-[900px] flex justify-center items-center next-button-container"
            >
              <div
                className="w-full max-w-[280px] md:w-80 h-12 md:h-14 relative cursor-pointer group next-button"
                onClick={() => dispatch(nextQuestion())}
              >
                <div
                  className="absolute inset-0 flex justify-center items-center z-10 bg-contain bg-no-repeat bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${buttonBG})`,
                    backgroundSize: "100% 100%",
                  }}
                >
                  <span className="text-orange-100 text-base md:text-lg font-normal font-Merriweather pt-1">
                    {currentQuestionIndex === questions.length - 1
                      ? "Finish Exercise"
                      : "Next Question"}
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
