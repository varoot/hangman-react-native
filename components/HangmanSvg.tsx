import React, { memo, useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { Animated } from 'react-native';
import { Colors } from 'react-native-paper';
import Svg, { Circle, G, Line } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const animationDuration = 250;

interface HangmanProps {
  stage?: number;
}

const lineProps = {
  fill: 'none',
  stroke: Colors.grey800,
  strokeLinecap: 'round' as 'round',
  strokeWidth: '3px',
};

function Hangman(props: HangmanProps): JSX.Element {
  const { stage = 0 } = props;

  const stepAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(stepAnim, {
      toValue: stage,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [stage, stepAnim]);

  const getValue = useCallback(
    (baseStage: number, outputRange: [number, number] | [string, string]) => {
      return stepAnim.interpolate({
        extrapolate: 'clamp',
        inputRange: [baseStage, baseStage + 1],
        outputRange,
      });
    },
    [stepAnim],
  );

  return (
    <Svg height="200" viewBox="0 0 200 200" width="200">
      {stage > 0 && <AnimatedLine x1="2" x2={getValue(0, [2, 198])} y1="198" y2="198" {...lineProps} />}
      {stage > 1 && <AnimatedLine x1="30" x2="30" y1="198" y2={getValue(1, [198, 2])} {...lineProps} />}
      {stage > 2 && <AnimatedLine x1="30" x2={getValue(2, [30, 150])} y1="2" y2="2" {...lineProps} />}
      <G transform="translate(130 2)">
        {stage > 3 && <AnimatedLine x1="0" x2="0" y1="0" y2={getValue(3, [0, 38])} {...lineProps} />}
        {stage > 4 && (
          <G transform="translate(0 58)">
            <AnimatedCircle
              cx="0"
              cy="0"
              r="20"
              strokeDasharray={getValue(4, ['0 200', `${20 * Math.PI * 2} 200`])}
              {...lineProps}
              transform="rotate(-90)"
            />
          </G>
        )}
        {stage > 5 && <AnimatedLine x1="0" x2="0" y1="78" y2={getValue(5, [78, 128])} {...lineProps} />}
        {stage > 6 && (
          <AnimatedLine x1="0" x2={getValue(6, [0, -30])} y1="78" y2={getValue(6, [78, 108])} {...lineProps} />
        )}
        {stage > 7 && (
          <AnimatedLine x1="0" x2={getValue(7, [0, 30])} y1="78" y2={getValue(7, [78, 108])} {...lineProps} />
        )}
        {stage > 8 && (
          <AnimatedLine x1="0" x2={getValue(8, [0, -30])} y1="128" y2={getValue(8, [128, 158])} {...lineProps} />
        )}
        {stage > 9 && (
          <AnimatedLine x1="0" x2={getValue(9, [0, 30])} y1="128" y2={getValue(9, [128, 158])} {...lineProps} />
        )}
      </G>
    </Svg>
  );
}

export default memo(Hangman);
