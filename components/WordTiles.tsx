import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import WordTile from './WordTile';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

interface WordTilesProps {
  guesses: Set<string>;
  isRevealed?: boolean;
  word: string;
}

function WordTiles(props: WordTilesProps): JSX.Element {
  const { guesses, isRevealed, word } = props;

  return (
    <View style={styles.container}>
      {word.split('').map((char, index) => {
        const isGuessed = guesses.has(char);
        return <WordTile key={index} char={char} isGuessed={isGuessed} isRevealed={isRevealed} />;
      })}
    </View>
  );
}

export default memo(WordTiles);
