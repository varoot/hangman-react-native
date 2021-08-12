import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import words from '../assets/words.json';
import HangmanSvg from './HangmanSvg';
import KeyboardRow from './KeyboardRow';
import WordTiles from './WordTiles';

function getRandomWord(): string {
  const index = Math.floor(Math.random() * words.length);
  return words[index].toLocaleUpperCase();
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  hangman: {
    marginBottom: 30,
  },
  keys: {
    marginTop: 30,
  },
  actions: {
    marginTop: 10,
  },
});

enum GameStatus {
  Running,
  Won,
  Lost,
}

function Game(): JSX.Element {
  const [word, setWord] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState(new Set<string>());
  const [status, setStatus] = useState(GameStatus.Running);
  const [incorrectGuessCount, setIncorrectGuessCount] = useState(0);

  const handleGuess = useCallback(
    (char: string) => {
      const updatedGuesses = new Set(guesses);
      updatedGuesses.add(char);
      setGuesses(updatedGuesses);
      if (word.includes(char)) {
        if (word.split('').every((letter) => updatedGuesses.has(letter))) {
          setStatus(GameStatus.Won);
        }
      } else {
        setIncorrectGuessCount(incorrectGuessCount + 1);
        if (incorrectGuessCount >= 9) {
          setStatus(GameStatus.Lost);
        }
      }
    },
    [incorrectGuessCount, guesses, word],
  );

  const handleResetGame = useCallback(() => {
    setGuesses(new Set());
    setStatus(GameStatus.Running);
    setWord(getRandomWord());
    setIncorrectGuessCount(0);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.hangman}>
        <HangmanSvg stage={incorrectGuessCount} />
      </View>
      <WordTiles isRevealed={status === GameStatus.Lost} guesses={guesses} word={word} />
      <View style={styles.keys}>
        <KeyboardRow isDisabled={status !== GameStatus.Running} guesses={guesses} word={word} onPress={handleGuess} />
      </View>
      <View style={styles.actions}>
        {status === GameStatus.Running ? (
          <Button onPress={handleResetGame}>Reset</Button>
        ) : (
          <Button mode="contained" onPress={handleResetGame}>
            New Game
          </Button>
        )}
      </View>
    </View>
  );
}

export default Game;
