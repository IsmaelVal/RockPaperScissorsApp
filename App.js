import React from "react";
import { SafeAreaView, StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
import RockPaperScissorsForm from './app/RockPaperScissorsForm';
import AudioService from './services/AudioService';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#010101" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Piedra, Papel o Tijeras</Text>
      </View>

      <RockPaperScissorsForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#010101',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
    paddingBottom: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});