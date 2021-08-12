import React, { FC, useCallback } from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 32,
    margin: 2,
    minWidth: 0,
    width: 32,
  },
  buttonText: {
    ...theme.fonts.regular,
    lineHeight: 15,
  },
  buttonActive: {
    backgroundColor: Colors.indigo500,
  },
  buttonActiveText: {
    color: Colors.white,
  },
  buttonCorrect: {},
  buttonCorrectText: {
    color: Colors.teal200,
  },
  buttonDisabled: {
    backgroundColor: Colors.grey400,
  },
  buttonDisabledText: {
    color: Colors.grey200,
  },
  buttonIncorrect: {},
  buttonIncorrectText: {
    color: Colors.red200,
  },
});

interface KeyboardLetterProps {
  char: string;
  isCorrect?: boolean;
  isDisabled?: boolean;
  isGuessed?: boolean;
  onPress: (char: string) => void;
}

function KeyboardLetter({ char, isCorrect, isDisabled, isGuessed, onPress }: KeyboardLetterProps): JSX.Element {
  const handlePress = useCallback(() => {
    onPress(char);
  }, [char, onPress]);

  const styleName = useMemo(() => {
    if (isGuessed) {
      return isCorrect ? 'Correct' : 'Incorrect';
    }
    return isDisabled ? 'Disabled' : 'Active';
  }, [isCorrect, isDisabled, isGuessed]);

  const style = useMemo(() => {
    return [styles.button, styles[`button${styleName}` as keyof typeof styles]];
  }, [styleName]);

  const labelStyle = useMemo(() => {
    return [styles.buttonText, styles[`button${styleName}Text` as keyof typeof styles]];
  }, [styleName]);

  return (
    <Button
      compact
      color={styles.buttonActiveText.color}
      disabled={isDisabled || isGuessed}
      labelStyle={labelStyle}
      style={style}
      onPress={handlePress}
    >
      {char}
    </Button>
  );
}

export default KeyboardLetter;
