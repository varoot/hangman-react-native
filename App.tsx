import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import Game from './components/Game';
import theme from './theme';

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <Appbar.Header>
        <Appbar.Content title="Hangman Game" />
      </Appbar.Header>
      <Game />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
