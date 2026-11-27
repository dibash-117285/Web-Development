import Row from './Row';
import { evaluateGuess } from '../utils/evaluateGuess';

// The whole board: 6 rows.
export default function GameBoard({ pastGuesses, currentGuess, solutionWord }) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    if (i < pastGuesses.length) {
      // A row you already submitted: show it with colors
      const statuses = evaluateGuess(pastGuesses[i], solutionWord);
      rows.push(<Row key={i} guess={pastGuesses[i]} statuses={statuses} />);
    } else if (i === pastGuesses.length) {
      // The row you are typing in right now
      rows.push(<Row key={i} guess={currentGuess} />);
    } else {
      // Empty rows for future guesses
      rows.push(<Row key={i} />);
    }
  }

  return <div className="board">{rows}</div>;
}
