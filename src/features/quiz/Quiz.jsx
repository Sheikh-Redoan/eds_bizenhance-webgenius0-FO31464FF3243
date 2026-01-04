import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, resetQuiz } from './quizSlice';
import Button from '../../components/ui/Button';

const Quiz = () => {
  const dispatch = useDispatch();
  const { currentQuestion, score, isComplete } = useSelector((state) => state.quiz);

  const questions = [
    {
      question: "What does 'Barajar' mean?",
      options: ['Shuffle', 'Dance', 'Sing', 'Walk'],
      correct: 0
    },
    {
      question: "Translate: 'Deck of cards'",
      options: ['Mesa de cartas', 'Baraja de cartas', 'Juego de cartas', 'Paquete de cartas'],
      correct: 1
    }
  ];

  const handleAnswer = (index) => {
    dispatch(answerQuestion({ questionIndex: currentQuestion, answer: index }));
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="font-medieval text-5xl text-wood-dark mb-4">Quiz Complete!</h1>
        <p className="text-2xl mb-8">Your Score: {score}/{questions.length}</p>
        <Button variant="gold" onClick={() => dispatch(resetQuiz())}>Try Again</Button>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-paper border-4 border-wood rounded-lg p-8 shadow-lg">
        <h2 className="font-medieval text-3xl text-wood-dark mb-6">Question {currentQuestion + 1}/{questions.length}</h2>
        <p className="text-xl mb-6">{current.question}</p>
        
        <div className="space-y-3">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 bg-wood-light/20 hover:bg-wood-light/40 border-2 border-wood rounded-lg text-left transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
