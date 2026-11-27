import Tile from './Tile';

// One row of 5 tiles.
// `guess` is a string like "CRA" (can be shorter than 5).
// `statuses` is an array of colors, or null if the row isn't submitted.
export default function Row({ guess = '', statuses = null }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    tiles.push(
      <Tile
        key={i}
        letter={guess[i]}
        status={statuses ? statuses[i] : null}
      />
    );
  }

  return <div className="row">{tiles}</div>;
}
