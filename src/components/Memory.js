import React, { useState, useEffect, useRef } from 'react';
import './Memory.css';  // Import CSS directly

const themesLibrary = {
  pokemon: [
    ['https://cloud.educaplay.com/recursos/93/2987825/1494449633.jpg', 'tn'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494450042.jpg', 'sec'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494449984.jpg', '1'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494450032.jpg', 'sec'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494449738.jpg', 'cot'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494530759.jpg', 'bn'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494449882.jpg', '1'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494449647.jpg', 'tn'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494449703.jpg', 'cot'],
    ['https://cloud.educaplay.com/recursos/93/2987825/1494530776.jpg', 'bn'],
  ]
  // ... other themes
};

const Header = () => (
  <header>
  </header>
);

const Game = ({ theme, resetGame }) => {
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [tempClick, setTempClick] = useState({ tempElt1: null, tempElt2: null });
  const [postGameMessage, setPostGameMessage] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (theme) {
      activateTheme(theme);
      // Start the timer when the theme is set
      timerRef.current = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }

    // Cleanup on component unmount or when game is reset
    return () => clearInterval(timerRef.current);
  }, [theme]);

  useEffect(() => {
    if (gameWon) {
      clearInterval(timerRef.current);
    }
  }, [gameWon]);

  const activateTheme = (theme) => {
    const images = themesLibrary[theme].map((image) => ({ src: image[0], value: image[1], revealed: false }));
    setSelectedImages(images);
  };

  const handleBoxClick = (index) => {
    if (selectedImages[index].revealed || clickCount === 2) return;

    const newImages = [...selectedImages];
    newImages[index].revealed = true;
    setSelectedImages(newImages);

    if (clickCount === 0) {
      setTempClick({ tempElt1: index, tempElt2: null });
      setClickCount(1);
    } else if (clickCount === 1 && index !== tempClick.tempElt1) {
      setTempClick((prev) => ({ ...prev, tempElt2: index }));
      setClickCount(2);

      if (newImages[index].value === newImages[tempClick.tempElt1].value) {
        setScore((prevScore) => prevScore + 10);
        setWin((prevWin) => {
          const newWin = prevWin + 2;
          if (newWin === 10) {
            setPostGameMessage(`You won ${score + 10} points in ${time} seconds`);
            setGameWon(true);
          }
          return newWin;
        });
        setClickCount(0);
      } else {
        setTimeout(() => {
          const resetImages = [...newImages];
          resetImages[index].revealed = false;
          resetImages[tempClick.tempElt1].revealed = false;
          setSelectedImages(resetImages);
          setClickCount(0);
        }, 800);
        setScore((prevScore) => (prevScore > 0 ? prevScore - 2 : 0));
      }
    }
  };

  return (
    <section className="main mx-auto">
      <div className="game-board">
        {selectedImages.map((image, index) => (
          <div key={index} className="box play" onClick={() => handleBoxClick(index)}>
            <img src={image.src} alt="game" className={image.revealed ? '' : 'hidden'} />
          </div>
        ))}
      </div>
      <div id="state">
        <span id="time">{time}</span>
        <span id="score">{score} </span>
      </div>
      {gameWon && (
        <div className="post-game-message mt-4">
          <p>{postGameMessage}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </section>
  );
};

const ThemeSelector = ({ selectTheme }) => (
  <section id="pre">
    <div id="themes">
      <h2>Choose your Game!</h2>
      <p className="themes" onClick={() => selectTheme('pokemon')}>Trigonomety</p>
      {/* Add other themes */}
    </div>
  </section>
);

const Memory = () => {
  const [theme, setTheme] = useState(null);

  const resetGame = () => {
    setTheme(null);
  };

  return (
    <div>
      <Header />
      {!theme ? (
        <ThemeSelector selectTheme={setTheme} />
      ) : (
        <Game theme={theme} resetGame={resetGame} />
      )}
    </div>
  );
};

export default Memory;