import React, { memo, useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { Colors } from 'react-native-paper';
import Svg, { Circle, G, Line } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);
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
  const swingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(stepAnim, {
      toValue: stage,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();

    if (stage >= 10) {
      Animated.sequence([
        Animated.delay(animationDuration),
        Animated.loop(
          Animated.sequence([
            Animated.timing(swingAnim, {
              toValue: 1,
              duration: 500,
              easing: Easing.out(Easing.sin),
              useNativeDriver: false,
            }),
            Animated.timing(swingAnim, {
              toValue: -1,
              duration: 1000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: false,
            }),
            Animated.timing(swingAnim, {
              toValue: 0,
              duration: 500,
              easing: Easing.in(Easing.sin),
              useNativeDriver: false,
            }),
          ]),
        ),
      ]).start();
    } else {
      swingAnim.stopAnimation();
      Animated.timing(swingAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [stage, stepAnim, swingAnim]);

  const getStroke = useCallback(
    (baseStage: number) => {
      return {
        ...lineProps,
        opacity: stepAnim.interpolate({
          extrapolate: 'clamp',
          inputRange: [baseStage, baseStage + 0.01],
          outputRange: [0, 1],
        }),
      };
    },
    [stepAnim],
  );

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
      <AnimatedLine x1="2" x2={getValue(0, [2, 198])} y1="198" y2="198" {...getStroke(0)} />
      <AnimatedLine x1="30" x2="30" y1="198" y2={getValue(1, [198, 2])} {...getStroke(1)} />
      <AnimatedLine x1="30" x2={getValue(2, [30, 150])} y1="2" y2="2" {...getStroke(2)} />
      <G transform="translate(130 2)">
        <AnimatedG
          transform={swingAnim.interpolate({
            inputRange: [-1, 1],
            outputRange: ['rotate(-2)', 'rotate(2)'],
          })}
        >
          <AnimatedLine x1="0" x2="0" y1="0" y2={getValue(3, [0, 38])} {...getStroke(3)} />
          <G transform="translate(0 58)">
            <AnimatedCircle
              cx="0"
              cy="0"
              r="20"
              strokeDasharray={getValue(4, ['0 200', `${20 * Math.PI * 2} 200`])}
              transform="rotate(-90)"
              {...getStroke(4)}
            />
          </G>
          <AnimatedLine x1="0" x2="0" y1="78" y2={getValue(5, [78, 128])} {...getStroke(5)} />
          <AnimatedLine x1="0" x2={getValue(6, [0, -30])} y1="78" y2={getValue(6, [78, 108])} {...getStroke(6)} />
          <AnimatedLine x1="0" x2={getValue(7, [0, 30])} y1="78" y2={getValue(7, [78, 108])} {...getStroke(7)} />
          <AnimatedLine x1="0" x2={getValue(8, [0, -30])} y1="128" y2={getValue(8, [128, 158])} {...getStroke(8)} />
          <AnimatedLine x1="0" x2={getValue(9, [0, 30])} y1="128" y2={getValue(9, [128, 158])} {...getStroke(9)} />
        </AnimatedG>
      </G>
    </Svg>
  );
}

export default memo(Hangman);
