// One square on the board.
// `status` is 'correct', 'present', 'absent', or null (not submitted yet).
export default function Tile({ letter, status }) {
  // e.g. "tile correct"  ->  CSS makes it green
  const className = status ? `tile ${status}` : 'tile';

  return <div className={className}>{letter}</div>;
}
