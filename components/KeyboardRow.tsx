import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';
import KeyboardLetter from './KeyboardLetter';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

interface KeyboardRowProps {
  isDisabled?: boolean;
  guesses: Set<string>;
  onPress: (char: string) => void;
  word: string;
}

function KeyboardRow({ isDisabled, guesses, onPress, word }: KeyboardRowProps): JSX.Element {
  return (
    <View style={styles.container}>
      {letters.map((char) => {
        const isCorrect = word.includes(char);
        const isGuessed = guesses.has(char);
        return (
          <KeyboardLetter
            key={char}
            char={char}
            isCorrect={isCorrect}
            isDisabled={isDisabled && !isGuessed}
            isGuessed={isGuessed}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

export default KeyboardRow;
