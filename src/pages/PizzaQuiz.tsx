import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "Which city is known as the birthplace of modern pizza?",
    options: ["Rome", "Naples", "Venice", "Florence"],
    correctAnswer: 1
  },
  {
    question: "What temperature do most pizza ovens reach?",
    options: ["200-300°F", "400-500°F", "700-800°F", "900-1000°F"],
    correctAnswer: 3
  },
  {
    question: "What was the first pizzeria in America?",
    options: ["Pizza Hut", "Lombardi's", "Domino's", "Papa John's"],
    correctAnswer: 1
  },
  {
    question: "Which pizza topping is the most popular worldwide?",
    options: ["Pepperoni", "Mushrooms", "Extra Cheese", "Sausage"],
    correctAnswer: 0
  },
  {
    question: "How many slices are typically in a large pizza?",
    options: ["6 slices", "8 slices", "10 slices", "12 slices"],
    correctAnswer: 1
  }
];

export const PizzaQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answerIndex: number) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-900">🍕 Pizza Quiz</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h2>
            <p className="text-xl mb-6">
              You scored {score} out of {questions.length}!
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      isAnswered ? 'opacity-50' : 'bg-white hover:bg-red-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};