import { GAME_STATUS } from '../constants';

export default function GameOverModal({
  status,
  solutionWord,
  guessCount,
  onPlayAgain,
}) {
  const won = status === GAME_STATUS.WON;

  return (
    <div className="modal-backdrop">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">{won ? 'You got it' : 'Out of guesses'}</h2>
        {won ? (
          <p>
            You found <strong>{solutionWord}</strong> in {guessCount}{' '}
            {guessCount === 1 ? 'guess' : 'guesses'}.
          </p>
        ) : (
          <p>
            The word was <strong>{solutionWord}</strong>.
          </p>
        )}
        <button type="button" className="primary" onClick={onPlayAgain} autoFocus>
          Play again
        </button>
      </div>
    </div>
  );
}
