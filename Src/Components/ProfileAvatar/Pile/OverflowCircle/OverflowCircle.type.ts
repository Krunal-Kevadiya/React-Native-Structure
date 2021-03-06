import { TextStyle, ViewStyle } from 'react-native';

export type OverflowCirclePropsType = {
  overflow?: number;
  circleStyle?: ViewStyle;
  overflowStyle?: ViewStyle;
  overflowLabelStyle?: TextStyle;
  circleSize: number;
};

export type StylePropsType = {
  overflow: ViewStyle;
  overflowLabel: TextStyle;
};
