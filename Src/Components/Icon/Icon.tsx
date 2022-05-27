import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { moderateScale } from 'rn-custom-style-sheet';
import type { IconPropsType } from './Icon.type';

export default function Icon({ type, size, source, style, svgStyle }: IconPropsType): React.ReactElement {
  const { width, height, tintColor } = (style as ImageStyle) ?? { width: 0, height: 0, tintColor: '' };
  const widthIsString = typeof width === 'string';
  const heightIsString = typeof height === 'string';
  const localColor = svgStyle?.color ?? tintColor ?? 'transparent';
  const localWidth: string | number = widthIsString ? width : moderateScale(width ?? size ?? 24);
  const localHeight: string | number = heightIsString ? height : moderateScale(height ?? size ?? 24);

  switch (type) {
    case 'svg': {
      // @ts-ignore
      const icon = source?.replace(/currentColor/g, localColor) ?? null;
      return (
        <SvgXml width={localWidth} height={localHeight} style={style} {...svgStyle} xml={icon} color={localColor} />
      );
    }
    case 'image':
      return (
        <Image
          source={source ?? -1}
          // @ts-ignore
          style={StyleSheet.compose(style, {
            tintColor: localColor,
            width: localWidth,
            height: localHeight
          })}
          {...svgStyle}
        />
      );
    default:
      return <></>;
  }
}
