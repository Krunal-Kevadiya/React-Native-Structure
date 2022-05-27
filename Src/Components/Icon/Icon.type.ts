import { ImageStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';

export type SvgIconPropsStyle = { type?: 'svg'; source?: string };
export type ImageIconPropsStyle = { type?: 'image'; source?: number };
export type OtherIconPropsStyle = { type?: never; source?: never };

export type IconPropsType = Partial<{
  size: number;
  style: ImageStyle;
  svgStyle: XmlProps;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);
