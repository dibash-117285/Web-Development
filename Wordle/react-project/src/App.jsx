import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { getKeyStatuses } from './utils/evaluateGuess';

// The secret word. It is fixed, so it never changes.
// Change it here if you want a different word (must be 5 letters, CAPITAL).
const SOLUTION = 'CRANE';

export default function App() {
  // ---- The 4 pieces of game state ----
  const [solutionWord] = useState(SOLUTION);          // the hidden word
  const [currentGuess, setCurrentGuess] = useState(''); // what you are typing now
  const [pastGuesses, setPastGuesses] = useState([]);   // guesses you already submitted
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); // 'IN_PROGRESS' | 'WON' | 'LOST'

  // A small message shown above the board (like "Not enough letters")
  const [message, setMessage] = useState('');

  // Runs when a key is pressed (physical OR on-screen).
  // `key` is a capital letter, 'ENTER', or 'BACKSPACE'.
  function handleKey(key) {
    // Game is over: ignore all input
    if (gameStatus !== 'IN_PROGRESS') return;

    setMessage('');

    if (key === 'BACKSPACE') {
      // Remove the last letter
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (key === 'ENTER') {
      // Need exactly 5 letters to submit
      if (currentGuess.length < 5) {
        setMessage('Not enough letters');
        return;
      }

      const newPastGuesses = [...pastGuesses, currentGuess];
      setPastGuesses(newPastGuesses);
      setCurrentGuess('');

      if (currentGuess === solutionWord) {
        setGameStatus('WON');
      } else if (newPastGuesses.length === 6) {
        setGameStatus('LOST');
      }
    } else if (currentGuess.length < 5) {
      // A letter: add it (only if the row isn't full)
      setCurrentGuess(currentGuess + key);
    }
  }

  // Listen for the physical keyboard.
  // We add the listener, and remove it (cleanup) before the next render,
  // so there is only ever one listener. This does not cause an infinite loop
  // because the effect never changes state by itself.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleKey('ENTER');
      } else if (event.key === 'Backspace') {
        handleKey('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKey(event.key.toUpperCase());
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const keyStatuses = getKeyStatuses(pastGuesses, solutionWord);

  return (
    <div className="app">
      <h1>Wordle</h1>
      <p className="message">{message}</p>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solutionWord={solutionWord}
      />

      <Keyboard keyStatuses={keyStatuses} onKeyPress={handleKey} />

      {/* Win message */}
      {gameStatus === 'WON' && (
        <div className="modal">
          <h2>You won!</h2>
          <p>
            The word was <strong>{solutionWord}</strong>.
          </p>
        </div>
      )}

      {/* Game over modal: reveals the word */}
      {gameStatus === 'LOST' && (
        <div className="modal">
          <h2>Game over</h2>
          <p>
            The word was <strong>{solutionWord}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
