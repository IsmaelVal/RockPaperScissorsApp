import RPSUtil from '../utils/RPSUtil';

describe('RPSUtil unit tests', () => {
  const { MOVES, OUTCOMES, decideWinner, getRandomMove } = RPSUtil();

  test('Máximo (WIN): PAPER vence a ROCK', () => {
    expect(decideWinner(MOVES.PAPER, MOVES.ROCK)).toBe(OUTCOMES.WIN);
  });

  test('Mínimo (LOSE): ROCK pierde vs PAPER', () => {
    expect(decideWinner(MOVES.ROCK, MOVES.PAPER)).toBe(OUTCOMES.LOSE);
  });

  test('Normal (DRAW): SCISSORS vs SCISSORS', () => {
    expect(decideWinner(MOVES.SCISSORS, MOVES.SCISSORS)).toBe(OUTCOMES.DRAW);
  });
  
  test('getRandomMove devuelve sólo ROCK | PAPER | SCISSORS', () => {
    const allowed = new Set([MOVES.ROCK, MOVES.PAPER, MOVES.SCISSORS]);
    for (let i = 0; i < 200; i++) {
      const m = getRandomMove();
      expect(allowed.has(m)).toBe(true);
    }
  });
});
