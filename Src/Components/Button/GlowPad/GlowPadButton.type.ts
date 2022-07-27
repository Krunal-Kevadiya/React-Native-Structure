import { ViewStyle, ImageStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';
import { Colors } from '@themes';
import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../Icon';

type ImagePropsType = {
  imageStyle?: ImageStyle;
  svgStyle?: XmlProps;
  size?: number;
} & (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);

export type GlowPadButtonPropsType = {
  style?: ViewStyle;
  image?: ImagePropsType;
  diameter: number;
  innerDiameter: number;
  numPulses: number;
  color: string;
  speed: number;
  duration: number;
} & typeof defaultProps;

export const defaultProps = {
  diameter: 120,
  innerDiameter: 30,
  numPulses: 5,
  speed: 10,
  duration: 1000,
  color: Colors.error
};

export type PulseType = {
  pulseKey: string;
  diameter: number;
  opacity: number;
  centerOffset: number;
};

export type RingViewPropsType = {
  delay: number;
  color: string;
  duration: number;
  pulse: PulseType;
};
