const RPSUtil = () => {
  const MOVES = { ROCK: 'ROCK', PAPER: 'PAPER', SCISSORS: 'SCISSORS' };
  const OUTCOMES = { WIN: 'WIN', LOSE: 'LOSE', DRAW: 'DRAW' };
  const order = [MOVES.ROCK, MOVES.PAPER, MOVES.SCISSORS];

  function getRandomMove() {
    const idx = Math.floor(Math.random() * order.length);
    return order[idx];
  }

  /**
   * @param {string} player - 'ROCK' | 'PAPER' | 'SCISSORS'
   * @param {string} cpu - 'ROCK' | 'PAPER' | 'SCISSORS'
   * @returns {'WIN'|'LOSE'|'DRAW'}
   */
  function decideWinner(player, cpu) {
    if (player === cpu) return OUTCOMES.DRAW;
    if (
      (player === MOVES.ROCK && cpu === MOVES.SCISSORS) ||
      (player === MOVES.PAPER && cpu === MOVES.ROCK) ||
      (player === MOVES.SCISSORS && cpu === MOVES.PAPER)
    ) return OUTCOMES.WIN;
    return OUTCOMES.LOSE;
  }

  return { MOVES, OUTCOMES, getRandomMove, decideWinner };
};

export default RPSUtil;