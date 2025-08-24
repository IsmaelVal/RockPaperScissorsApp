import React, { useMemo } from 'react';
import { StyleSheet, View, Image, Pressable, Modal } from 'react-native';
import { Button, Stack as MaterialStack, Text } from "@react-native-material/core";
import useRPSGame from '../hooks/UseRPSGame';

const moveImages = {
  ROCK: require('../assets/images/piedra.png'),
  PAPER: require('../assets/images/papel.png'),
  SCISSORS: require('../assets/images/tijeras.png'),
};

export default function RockPaperScissorsForm() {
  const {
    playerScore,
    cpuScore,
    lastRound,
    isDialogVisible,
    closeDialog,
    playRound,
    resetGame,
    MOVES,
    OUTCOMES
  } = useRPSGame();

  const outcomeTexts = useMemo(() => ({
    [OUTCOMES.WIN]: { title: '¡Ganaste!', body: 'Tu elección vence a la de la PC.' },
    [OUTCOMES.LOSE]: { title: 'Perdiste', body: 'La PC gana esta ronda.' },
    [OUTCOMES.DRAW]: { title: 'Empate', body: 'Ambos eligieron lo mismo.' },
  }), [OUTCOMES]);

  const lastOutcome = lastRound?.outcome ?? null;
  const dialogText = lastOutcome ? outcomeTexts[lastOutcome] : null;

  return (
    <MaterialStack>
      <View style={styles.headline}>
        <Text variant="h6">Jugador vs PC</Text>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.scoreCard}>
          <Text variant="subtitle1" style={styles.scoreLabel}>Jugador</Text>
          <Text variant="h4" style={styles.scoreValue}>{playerScore}</Text>
        </View>
        <View style={styles.scoreCard}>
          <Text variant="subtitle1" style={styles.scoreLabel}>PC</Text>
          <Text variant="h4" style={styles.scoreValue}>{cpuScore}</Text>
        </View>
      </View>

      <View style={styles.choicesRow}>
        <ChoiceButton label="Piedra" image={moveImages.ROCK} onPress={() => playRound(MOVES.ROCK)} />
        <ChoiceButton label="Papel" image={moveImages.PAPER} onPress={() => playRound(MOVES.PAPER)} />
        <ChoiceButton label="Tijeras" image={moveImages.SCISSORS} onPress={() => playRound(MOVES.SCISSORS)} />
      </View>

      <View style={styles.lastRoundContainer}>
        <Text variant="subtitle1" style={styles.sectionTitle}>Última ronda</Text>
        {lastRound ? (
          <View style={styles.lastRoundRow}>
            <View style={styles.lastRoundCol}>
              <Text style={styles.lastRoundLabel}>Tú</Text>
              <Image source={moveImages[lastRound.playerMove.type]} style={styles.lastRoundImg} resizeMode="contain" />
            </View>
            <View style={styles.lastRoundCol}>
              <Text style={styles.lastRoundLabel}>PC</Text>
              <Image source={moveImages[lastRound.cpuMove.type]} style={styles.lastRoundImg} resizeMode="contain" />
            </View>
          </View>
        ) : (
          <Text style={styles.placeholder}>Aún no hay jugadas</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="REINICIAR" color="#010101" style={styles.formButton} onPress={resetGame} />
      </View>

      <View style={styles.footerContainer}>
        <Image source={require('../assets/images/icon.png')} style={styles.footerImg} resizeMode="contain" />
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isDialogVisible}
        onRequestClose={closeDialog}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.dialog}>
            {lastRound && (
              <>
                <Text variant="h6" style={styles.dialogTitle}>{dialogText?.title}</Text>
                <Text style={styles.dialogBody}>{dialogText?.body}</Text>
                <View style={styles.dialogImagesRow}>
                  <Image source={moveImages[lastRound.playerMove.type]} style={styles.dialogImg} resizeMode="contain" />
                  <Text style={styles.vsText}>VS</Text>
                  <Image source={moveImages[lastRound.cpuMove.type]} style={styles.dialogImg} resizeMode="contain" />
                </View>
                <Button title="OK" color="#010101" onPress={closeDialog} style={{ marginTop: 12 }} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </MaterialStack>
  );
}

function ChoiceButton({ label, image, onPress }) {
  return (
    <Pressable style={styles.choice} onPress={onPress} android_ripple={{ color: '#e0e0e0' }}>
      <Image source={image} style={styles.choiceImg} resizeMode="contain" />
      <Text style={styles.choiceLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scoreCard: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    elevation: 1,
  },
  scoreLabel: { color: '#666666' },
  scoreValue: { color: '#000000', fontWeight: 'bold' },

  choicesRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  choice: {
    alignItems: 'center',
    width: 96,
  },
  choiceImg: { width: 84, height: 84 },
  choiceLabel: { marginTop: 6, color: '#333333', fontWeight: 'bold' },

  lastRoundContainer: { marginTop: 24, marginHorizontal: 16 },
  sectionTitle: { color: '#666666' },
  lastRoundRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  lastRoundCol: { alignItems: 'center' },
  lastRoundLabel: { marginBottom: 6, color: '#333333' },
  lastRoundImg: { width: 80, height: 80 },
  placeholder: { marginTop: 8, color: '#999999', textAlign: 'center' },

  buttonContainer: { marginTop: 24, marginRight: 80, marginLeft: 80 },
  formButton: { shadowOffset: 0 },

  footerContainer: { marginTop: 24, alignItems: 'center' },
  footerImg: { width: 240, height: 240 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
  dialogTitle: { textAlign: 'center', marginBottom: 4 },
  dialogBody: { textAlign: 'center', color: '#555' },
  dialogImagesRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dialogImg: { width: 64, height: 64 },
  vsText: { fontWeight: 'bold' },
});