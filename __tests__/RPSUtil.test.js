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

  test('ROCK vence a SCISSORS', () => {
    expect(decideWinner(MOVES.ROCK, MOVES.SCISSORS)).toBe(OUTCOMES.WIN);
  });
  test('PAPER vence a ROCK', () => {
    expect(decideWinner(MOVES.PAPER, MOVES.ROCK)).toBe(OUTCOMES.WIN);
  });
  test('SCISSORS vence a PAPER', () => {
    expect(decideWinner(MOVES.SCISSORS, MOVES.PAPER)).toBe(OUTCOMES.WIN);
  });

  test('ROCK pierde vs PAPER', () => {
    expect(decideWinner(MOVES.ROCK, MOVES.PAPER)).toBe(OUTCOMES.LOSE);
  });
  test('PAPER pierde vs SCISSORS', () => {
    expect(decideWinner(MOVES.PAPER, MOVES.SCISSORS)).toBe(OUTCOMES.LOSE);
  });
  test('SCISSORS pierde vs ROCK', () => {
    expect(decideWinner(MOVES.SCISSORS, MOVES.ROCK)).toBe(OUTCOMES.LOSE);
  });

  test('Empate ROCK', () => {
    expect(decideWinner(MOVES.ROCK, MOVES.ROCK)).toBe(OUTCOMES.DRAW);
  });
  test('Empate PAPER', () => {
    expect(decideWinner(MOVES.PAPER, MOVES.PAPER)).toBe(OUTCOMES.DRAW);
  });
  test('Empate SCISSORS', () => {
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
