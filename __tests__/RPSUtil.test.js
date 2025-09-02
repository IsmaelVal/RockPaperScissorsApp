import RPSUtil from '../utils/RPSUtil';

describe('RPSUtil unit tests', () => {
  const { MOVES, OUTCOMES, decideWinner} = RPSUtil();

  test('Máximo (Victoria): Papel le gana a Piedra', () => {
    expect(decideWinner(MOVES.PAPER, MOVES.ROCK)).toBe(OUTCOMES.WIN);
  });

  test('Mínimo (Pierde): Piedra pierde contra Papel', () => {
    expect(decideWinner(MOVES.ROCK, MOVES.PAPER)).toBe(OUTCOMES.LOSE);
  });

  test('Normal (Empate): Tijeras vs Tijeras empatan', () => {
    expect(decideWinner(MOVES.SCISSORS, MOVES.SCISSORS)).toBe(OUTCOMES.DRAW);
  });
});
