import { ViewStyle } from 'react-native';
import type { ViewStylePropsType } from '@themes';

export type HorizontalProgressHandleType = Required<{
  setProgress: (value: number) => void;
  clearProgress: () => void;
}>;

export type StylePropsType = {
  containerStyle: ViewStyle;
} & ViewStylePropsType;
