// Ejecuta: node scripts/manual-check.js

require('@babel/register')({ presets: ['babel-preset-expo'] });
const RPSUtil = require('../utils/RPSUtil').default;

const { MOVES, OUTCOMES, decideWinner } = RPSUtil();
const res = decideWinner(MOVES.PAPER, MOVES.ROCK);
console.log('Manual: PAPER vs ROCK -> esperado WIN | obtenido:', res);
