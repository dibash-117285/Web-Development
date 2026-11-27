// Pool of possible solution words (all 5 letters, lowercase).
const SOLUTIONS = [
  'apple', 'brave', 'cabin', 'dance', 'eagle', 'flame', 'grape', 'house',
  'ivory', 'jolly', 'knife', 'lemon', 'mango', 'night', 'ocean', 'piano',
  'queen', 'river', 'stone', 'tiger', 'union', 'vivid', 'water', 'xenon',
  'yacht', 'zebra', 'angle', 'beach', 'chair', 'dream', 'earth', 'field',
  'ghost', 'heart', 'input', 'joint', 'kiosk', 'light', 'music', 'novel',
  'olive', 'plant', 'quiet', 'robot', 'smile', 'table', 'ultra', 'voice',
  'world', 'youth', 'crane', 'slate', 'pride', 'blend', 'cloud', 'drift',
  'frost', 'grain', 'hinge', 'lunar', 'mirth', 'nerve', 'orbit', 'pulse',
  'quest', 'raven', 'spice', 'trace', 'unity', 'vapor', 'wheat', 'yield',
  'array', 'bytes', 'cache', 'debug', 'email', 'logic', 'macro', 'proxy',
  'query', 'route', 'stack', 'token', 'virus', 'patch', 'shell', 'linux',
];

export function pickSolution() {
  const index = Math.floor(Math.random() * SOLUTIONS.length);
  return SOLUTIONS[index].toUpperCase();
}
