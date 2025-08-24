import { useState } from 'react';
import RPSUtil from '../utils/RPSUtil';
import { GameStateVO } from '../valueobjects/GameStateVO';
import { MoveVO } from '../valueobjects/MoveVO';
import AudioService from '../services/AudioService';

const useRPSGame = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [lastRound, setLastRound] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const { getRandomMove, decideWinner, MOVES, OUTCOMES } = RPSUtil();

  function playRound(playerMoveType) {
    const playerMove = new MoveVO(playerMoveType);
    const cpuMove = new MoveVO(getRandomMove());
    const outcome = decideWinner(playerMove.type, cpuMove.type);

    const state = new GameStateVO(playerMove, cpuMove, outcome);
    setLastRound(state);

    if (outcome === OUTCOMES.WIN) setPlayerScore((s) => s + 1);
    else if (outcome === OUTCOMES.LOSE) setCpuScore((s) => s + 1);

    AudioService.playOutcome(outcome).catch(() => {});

    setDialogVisible(true);
  }

  function resetGame() {
    setPlayerScore(0);
    setCpuScore(0);
    setLastRound(null);
    setDialogVisible(false);
  }

  function closeDialog() { setDialogVisible(false); }

  return {
    playerScore,
    cpuScore,
    lastRound,
    isDialogVisible,
    closeDialog,
    playRound,
    resetGame,
    MOVES,
    OUTCOMES,
  };
};

export default useRPSGame;