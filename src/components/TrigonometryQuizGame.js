import React, { useState } from 'react';
import './TrigonometryQuizGame.css'; // Import styles

const questionBank = [
  { question: 'sin(30°)', correctAnswer: '0.5', options: ['0.5', '1', '√3/2', '0'] },
  { question: 'cos(60°)', correctAnswer: '0.5', options: ['0.5', '1', '√3/2', '0'] },
  { question: 'tan(45°)', correctAnswer: '1', options: ['0.5', '1', '√3/2', '0'] },
  { question: 'sin(90°)', correctAnswer: '1', options: ['0', '0.5', '1', '√3/2'] },
  { question: 'cos(0°)', correctAnswer: '1', options: ['0', '1', '0.5', '√3/2'] },
  { question: 'tan(0°)', correctAnswer: '0', options: ['0', '1', '0.5', '√3/2'] },
  { question: 'sin(45°)', correctAnswer: '√2/2', options: ['√2/2', '0', '1', '0.5'] },
  { question: 'cos(30°)', correctAnswer: '√3/2', options: ['√3/2', '0.5', '0', '1'] },
  { question: 'sin²(θ) + cos²(θ) = ?', correctAnswer: '1', options: ['1', '0', 'sin(θ)', 'cos(θ)'] },
  { question: 'tan(θ) = ?', correctAnswer: 'sin(θ) / cos(θ)', options: ['sin(θ) / cos(θ)', 'cos(θ) / sin(θ)', '1', 'sin²(θ) + cos²(θ)'] },
  { question: 'The double angle formula for sin(2θ) is ?', correctAnswer: '2sin(θ)cos(θ)', options: ['2sin(θ)cos(θ)', 'sin²(θ) - cos²(θ)', '2cos²(θ) - 1', '1 - 2sin²(θ)'] },
  { question: 'The double angle formula for cos(2θ) is ?', correctAnswer: 'cos²(θ) - sin²(θ)', options: ['cos²(θ) - sin²(θ)', '2cos²(θ) - 1', '1 - 2sin²(θ)', '2sin(θ)cos(θ)'] },
  { question: 'The formula for the tangent of a sum is ?', correctAnswer: '(tan(A) + tan(B)) / (1 - tan(A)tan(B))', options: ['(tan(A) + tan(B)) / (1 - tan(A)tan(B))', 'tan(A)tan(B) / (1 - tan(A)tan(B))', 'tan(A + B)', 'tan(A) + tan(B)'] },
  { question: 'If sin(θ) = 3/5, what is cos(θ)?', correctAnswer: '4/5', options: ['4/5', '3/5', '5/3', '1/5'] },
];

const getRandomQuestion = () => {
  return questionBank[Math.floor(Math.random() * questionBank.length)];
};

const TrigonometryQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswerClick = (answer) => {
    if (gameOver) return; // Prevent interaction if the game is over

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setFeedback('Correct!');
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore >= 10) {
          setGameOver(true);
          setFeedback('Congratulations! You reached the maximum score.');
          return newScore;
        }
        return newScore;
      });
    } else {
      setFeedback(`Wrong! The correct answer was ${currentQuestion.correctAnswer}.`);
      setWrongAnswers((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 3) {
          setGameOver(true);
          setFeedback('Game Over! You made too many mistakes.');
        }
        return newCount;
      });
    }

    setShowNext(true);
  };

  const handleNextQuestion = () => {
    if (gameOver) return; // Prevent interaction if the game is over

    setCurrentQuestion(getRandomQuestion());
    setSelectedAnswer('');
    setFeedback('');
    setShowNext(false);
  };

  return (
    <div className="quiz-container mx-auto ">
      <h1>Trigonometry Quiz Game</h1>
      <p>Score: {score}</p>
      <div className="question-section">
        <h2>{currentQuestion.question}</h2>
      </div>
      <div className="answer-section">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            className={`answer-button ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== '' || gameOver}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="feedback">{feedback}</p>
      {!gameOver && showNext && <button onClick={handleNextQuestion}>Next Question</button>}
      {gameOver && <button onClick={() => window.location.reload()}>Restart Game</button>}
    </div>
  );
};

export default TrigonometryQuizGame;
