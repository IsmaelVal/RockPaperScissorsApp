require('@babel/register')({ presets: ['babel-preset-expo'] });
const RPSUtil = require('../utils/RPSUtil').default;

const { MOVES, OUTCOMES, decideWinner } = RPSUtil();
const res = decideWinner(MOVES.PAPER, MOVES.ROCK);
console.log('Manual: Papel contra Piedra -> se espera WIN | obtenido:', res);
