import { Audio } from 'expo-av';

let initialized = false;
let sounds = { WIN: null, DRAW: null, LOSE: null };

async function init() {
  if (initialized) return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true, 
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    const [win, draw, lose] = await Promise.all([
      Audio.Sound.createAsync(require('../assets/sounds/win.mp3'),  { volume: 1.0 }),
      Audio.Sound.createAsync(require('../assets/sounds/draw.mp3'), { volume: 1.0 }),
      Audio.Sound.createAsync(require('../assets/sounds/lose.mp3'), { volume: 1.0 }),
    ]);
    sounds.WIN  = win.sound;
    sounds.DRAW = draw.sound;
    sounds.LOSE = lose.sound;

    initialized = true;
  } catch (_e) {
    initialized = false;
  }
}

async function playOutcome(outcome) {
  // Asegurar inicialización
  if (!initialized) await init();

  // Mapear asset por resultado
  const asset = outcome === 'WIN'
    ? require('../assets/sounds/win.mp3')
    : outcome === 'DRAW'
      ? require('../assets/sounds/draw.mp3')
      : require('../assets/sounds/lose.mp3');

  const preloaded = sounds[outcome];

  try {
    if (preloaded) {
      await preloaded.setPositionAsync(0);
      await preloaded.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(asset, { shouldPlay: true, volume: 1.0 });
      sound.setOnPlaybackStatusUpdate(async (st) => {
        if (st.isLoaded && st.didJustFinish) {
          try { await sound.unloadAsync(); } catch {}
        }
      });
    }
  } catch {
  }
}

async function unload() {
  await Promise.all(
    Object.values(sounds).map(s => (s ? s.unloadAsync().catch(()=>{}) : Promise.resolve()))
  );
  sounds = { WIN: null, DRAW: null, LOSE: null };
  initialized = false;
}

export default { init, playOutcome, unload };
