import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSongDetailsQuery } from '../../redux/api/contentApi';
import { selectCurrentStep, endTutorial } from '../../redux/slices/tutorialSlice';

const QuizResults = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const { score, questions } = useSelector((state) => state.quiz);
  
  const { data: songDetails } = useGetSongDetailsQuery(songId);
  const songData = songDetails?.data;
  
  if (!songData) {
    return <div className="text-white text-center mt-20">Loading Results...</div>;
  }

  const percentage = Math.round((score / questions.length) * 100);
  const getResultMessage = () => {
    if (percentage === 100) return "Perfect Score!";
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good Job!";
    return "Keep Practicing!";
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[524px] h-[670px] relative bg-transparent scale-90 sm:scale-100">
        {/* Header */}
        <div className="left-[65.50px] top-0 absolute inline-flex flex-col justify-start items-center gap-4 w-[393px]">
          <div className="self-stretch text-center justify-center text-white text-5xl font-normal font-OldLondon leading-[52.80px]">
            {songData.title}
          </div>
          <div className="justify-center text-white text-xl font-normal font-Merriweather leading-6 text-center">
            Exercise Results
          </div>
        </div>

        {/* Background */}
        <img 
          className="w-[524px] h-[541px] left-0 top-[129px] absolute rounded-xl object-cover opacity-20 bg-black" 
          src={songData.image} 
          alt="Background" 
        />
        <div className="w-[524px] h-[541px] left-0 top-[129px] absolute rounded-xl bg-gradient-to-b from-black/80 to-stone-900/90 border-2 border-stone-600" />
        
        {/* Results Content */}
        <div className="w-full text-center top-[159px] absolute justify-center text-white text-3xl font-bold font-Merriweather leading-10 z-10">
          {getResultMessage()}
        </div>
        
        <div className="w-56 left-[149px] top-[267px] absolute inline-flex flex-col justify-start items-center gap-6 z-10">
          <div className="self-stretch text-center justify-center text-white text-8xl font-bold font-Merriweather">
            {score}/{questions.length}
          </div>
          <div className="self-stretch text-center justify-center text-white text-2xl font-normal font-Merriweather leading-8">
            {percentage}% Correct
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-96 left-[65px] top-[527px] absolute inline-flex justify-start items-center gap-6 z-20">
          <div 
            id="tour-view-dashboard"
            className="flex-1 h-20 relative overflow-hidden cursor-pointer group"
            onClick={() => {
              if (currentStep === 7) dispatch(endTutorial());
              navigate('/dashboard');
            }}
          >
            <div className="w-full h-full border-2 border-stone-400 absolute top-0 left-0 skew-x-[-10deg] bg-stone-800/80 hover:bg-stone-700 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white text-base font-normal font-Merriweather leading-4">
              Dashboard
            </div>
          </div>

          <div 
            className="flex-1 h-20 relative overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/listen/${songId}`)}
          >
            <div className="w-full h-full border-2 border-stone-400 absolute top-0 left-0 skew-x-[-10deg] bg-stone-200 hover:bg-white transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-stone-800 text-base font-normal font-Merriweather leading-4">
              Back to Song
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;