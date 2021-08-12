import React, { memo, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';

const animationDuration = 250;
const tileMinWidth = 12;
const tileMaxWidth = 32;
const tileHeight = 30;
const slideStartPosition = -16;
const slideEndPosition = 4;

const styles = StyleSheet.create({
  text: {
    color: Colors.grey900,
    fontSize: 16,
    position: 'absolute',
    bottom: 4,
  },
  textError: {
    color: Colors.red600,
  },
  tile: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey600,
    flexGrow: 1,
    height: tileHeight,
    justifyContent: 'center',
    marginHorizontal: 2,
    maxWidth: tileMaxWidth,
    minWidth: tileMinWidth,
    overflow: 'hidden',
    position: 'relative',
  },
});

interface WordTileProps {
  char: string;
  isGuessed?: boolean;
  isRevealed?: boolean;
}

function WordTile(props: WordTileProps): JSX.Element {
  const { char, isGuessed, isRevealed } = props;

  const slideAnim = useRef(new Animated.Value(slideStartPosition)).current;

  const isDisplayed = isGuessed || isRevealed;

  useEffect(() => {
    if (isDisplayed) {
      Animated.timing(slideAnim, {
        toValue: slideEndPosition,
        duration: animationDuration,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: false,
      }).start();
    } else {
      slideAnim.setValue(slideStartPosition);
    }
  }, [isDisplayed, slideAnim]);

  return (
    <View style={styles.tile}>
      <Animated.Text style={[styles.text, !isGuessed && styles.textError, { bottom: slideAnim }]}>{char}</Animated.Text>
    </View>
  );
}

export default memo(WordTile);
