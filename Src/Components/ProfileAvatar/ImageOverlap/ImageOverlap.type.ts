import { TextStyle, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';

export type ImageOverlapPropsType = {
  source?: string;
  size?: number;
  style: ViewStyle;
  svgStyle?: XmlProps;
};

export type StylePropsType = {
  imageOverlap: ViewStyle;
  svgColor: TextStyle;
};
