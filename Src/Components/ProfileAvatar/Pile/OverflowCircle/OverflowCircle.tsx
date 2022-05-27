import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { moderateScale, useMyTheme } from 'rn-custom-style-sheet';
import type { OverflowCirclePropsType } from './OverflowCircle.type';
import styleSheet from './OverflowCircle.style';

export default function OverflowCircle({
  overflow,
  circleStyle,
  overflowStyle,
  overflowLabelStyle,
  circleSize
}: OverflowCirclePropsType) {
  const styles = useMyTheme(styleSheet);
  const localSize: number = moderateScale(circleSize);

  const localCircleStyle: ViewStyle = {
    width: localSize,
    height: localSize
  };

  return (
    <View style={StyleSheet.compose(localCircleStyle, circleStyle)}>
      <View
        style={StyleSheet.flatten([styles.overflow, localCircleStyle, { borderRadius: localSize / 2 }, overflowStyle])}
      >
        <Text style={StyleSheet.flatten([styles.overflowLabel, { fontSize: localSize * 0.4 }, overflowLabelStyle])}>
          +{overflow}
        </Text>
      </View>
    </View>
  );
}
