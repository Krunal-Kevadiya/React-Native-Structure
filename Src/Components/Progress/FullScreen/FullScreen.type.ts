import { ViewStyle } from 'react-native';
import type { ViewStylePropsType } from '@themes';

export type FullScreenProgressHandleType = Required<{
  show: () => void;
  hide: () => void;
}>;

export type StylePropsType = {
  containerStyle: ViewStyle;
} & ViewStylePropsType;
