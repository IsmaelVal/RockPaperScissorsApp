import RPSUtil from '../utils/RPSUtil';

describe('RPSUtil unit tests', () => {
  const { MOVES, OUTCOMES, decideWinner, getRandomMove } = RPSUtil();

  test('Máximo (Victoria): Papel le gana a Piedra', () => {
    expect(decideWinner(MOVES.PAPER, MOVES.ROCK)).toBe(OUTCOMES.WIN);
  });

  test('Mínimo (Pierde): Piedra pierde vs Papel', () => {
    expect(decideWinner(MOVES.ROCK, MOVES.PAPER)).toBe(OUTCOMES.LOSE);
  });

  test('Normal (Empate): Tijeras vs Tijeras', () => {
    expect(decideWinner(MOVES.SCISSORS, MOVES.SCISSORS)).toBe(OUTCOMES.DRAW);
  });
});
