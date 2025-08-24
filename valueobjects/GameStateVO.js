/**
 * @constructor
 * @param {MoveVO} playerMove
 * @param {MoveVO} cpuMove
 * @param {'WIN'|'LOSE'|'DRAW'} outcome
 */
exports.GameStateVO = function (playerMove, cpuMove, outcome) {
  this.playerMove = playerMove;
  this.cpuMove = cpuMove;
  this.outcome = outcome;
};