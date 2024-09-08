import React, { useState } from "react";
import ninjaImage from '../assets/ninja.jpg'; // Update this with the correct path if using a local image
import backgroundImage from '../assets/ba.jpg'; // Update this with the correct path for the background image
import fullPageBackground from '../assets/fba.jpg'; // Add your full-page background image here

const quizQuestions = [
  { question: "What is the value of g for earth?", answer: "9.8" },
  { question: "what is the chemical name for salt?", answer: "nacl" },
  { question: "Newton's first law of motion is related to ?", answer: "Inertia" },
  { question: "what is the powerhouse of the cell?", answer: "mitochondria" },
  { question: "what is the freezing point of water?", answer: "0" },
  { question: "What is the boiling point of water?", answer: "100" },
  { question: "What is 12 - 4?", answer: "8" },
  { question: "What language is spoken in Brazil?", answer: "Portuguese" },
  { question: "What is 6 / 2?", answer: "3" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
];

function Ninja() {
  const [step, setStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleAnswerSubmit = () => {
    if (userAnswer.toLowerCase() === quizQuestions[currentQuestionIndex].answer.toLowerCase()) {
      setMessage("Correct!");
      if (step < 8) {
        setStep(step + 1);
      }
    } else {
      setMessage("Wrong answer.");
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex >= quizQuestions.length) {
      setGameOver(true);
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }

    setUserAnswer("");
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const hasWon = step >= 8;
  const hasLost = gameOver && !hasWon;
console.log(userAnswer);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "5px",
        minHeight: "100vh",
        backgroundImage: `url(${fullPageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>Ninja Quiz Game</h1>
      <h6 style={{ fontSize: "1.2em", marginBottom: "40px" }}>Reach 8 steps to win</h6>

      <div 
        style={{ 
          margin: "0 auto", 
          width: "80%", 
          height: "300px", 
          position: "relative", 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Line beneath the ninja */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "5px",
            backgroundColor: "#333",
            bottom: "0px",
            borderRadius: "0 0 15px 15px",
          }}
        ></div>
        
        {/* Ninja character */}
        <img
          src={ninjaImage}
          alt="Ninja"
          style={{
            width: "100px",
            height: "60px",
            position: "absolute",
            left: `${step * 10}%`,
            bottom: "5px",
            transition: "left 0.5s",
          }}
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        {gameOver ? (
          <div>
            {hasWon ? (
              <div>
                <h2 style={{ color: "#4CAF50", fontSize: "2.5em" }}>Congratulations!</h2>
                <p style={{ fontSize: "1.5em" }}>You win! Your ninja reached 8 steps!</p>
              </div>
            ) : (
              <div>
                <h2 style={{ color: "#F44336", fontSize: "2.5em" }}>Game Over!</h2>
                <p style={{ fontSize: "1.5em" }}>Your ninja moved {step} steps forward.</p>
                <p style={{ fontSize: "1.5em" }}>Unfortunately, you didn't reach 8 steps.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {currentQuestionIndex < quizQuestions.length ? (
              <div>
                <h2 style={{ fontSize: "2em" }}>Question {currentQuestionIndex + 1}:</h2>
                <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>{quizQuestions[currentQuestionIndex].question}</p>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleInputChange}
                  placeholder="Enter your answer"
                  style={{
                    fontSize: "1em",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    marginBottom: "10px",
                    color:"black"
                  }}
                />
                <br />
                <button
                  onClick={handleAnswerSubmit}
                  style={{
                    fontSize: "1em",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s",
                  }}
                >
                  Submit Answer
                </button>
                <p style={{ fontSize: "1.2em", marginTop: "10px" }}>{message}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ninja;
