import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { moderateScale } from 'rn-custom-style-sheet';
import { Icon } from '@components';
import { isNotNullOrEmpty } from '@utils';
import type { GlowPadButtonPropsType, RingViewPropsType, PulseType } from './GlowPadButton.type';
import styles from './GlowPadButton.style';
import { defaultProps } from './GlowPadButton.type';

function RingView({ delay, color, duration, pulse }: RingViewPropsType): React.ReactElement {
  const ring = useSharedValue<number>(0);

  const ringStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      backgroundColor: color,
      width: pulse.diameter,
      height: pulse.diameter,
      opacity: pulse.opacity,
      borderRadius: pulse.diameter / 2,
      transform: [
        {
          scale: delay === 0 ? 1 : interpolate(ring.value, [0, 1], [0, 2])
        }
      ]
    };
  }, [pulse, delay]);

  useEffect(() => {
    if (delay !== 0) {
      ring.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: duration
          }),
          -1,
          true
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={StyleSheet.flatten([styles.pulse, ringStyle])} />;
}

export default function GlowPadButton({
  style,
  image,
  diameter,
  innerDiameter,
  numPulses,
  color,
  speed,
  duration
}: GlowPadButtonPropsType): React.ReactElement {
  const [pulses, setPulses] = useState<PulseType[]>([]);
  const containerStyle: { width: number; height: number } = {
    width: moderateScale(diameter),
    height: moderateScale(diameter)
  };

  useEffect(() => {
    const changeDiameter: number = moderateScale(diameter);
    const diameterDiff: number = (changeDiameter - moderateScale(innerDiameter)) / (numPulses - 1);
    const localPulses: PulseType[] = Array.from({ length: numPulses }).map((_, i) => {
      const newDiameter = changeDiameter - diameterDiff * (numPulses - (i + 1));
      const centerOffset = (changeDiameter - newDiameter) / 2;
      const opacity = 1 / (i + 1);
      const pulse = {
        pulseKey: `${i + 1}`,
        diameter: newDiameter,
        opacity,
        centerOffset
      };
      return pulse;
    });
    setPulses(localPulses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={StyleSheet.flatten([styles.centerView, style, containerStyle])}>
      {pulses.map((pulse, index) => (
        <RingView key={pulse.pulseKey} delay={index * speed} color={color} pulse={pulse} duration={duration} />
      ))}
      {isNotNullOrEmpty(image?.source) && <Icon {...image} />}
    </View>
  );
}

GlowPadButton.defaultProps = defaultProps;
