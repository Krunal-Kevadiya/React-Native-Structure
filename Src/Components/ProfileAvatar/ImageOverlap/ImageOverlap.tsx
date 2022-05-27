import _ from 'lodash';
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useMyTheme } from 'rn-custom-style-sheet';
import type { ImageOverlapPropsType } from './ImageOverlap.type';
import { Icon } from '../../Icon';
import styleSheet from './ImageOverlap.style';

export default function ImageOverlap({ source, size, style, svgStyle }: ImageOverlapPropsType): React.ReactElement {
  const styles = useMyTheme(styleSheet);
  const localStyle: ViewStyle = _.omit(StyleSheet.flatten(style), 'marginTop');

  return (
    <View style={StyleSheet.compose(localStyle, styles.imageOverlap)}>
      <Icon
        type="svg"
        size={size}
        source={source}
        //@ts-ignore
        svgStyle={StyleSheet.compose(styles.svgColor, svgStyle)}
      />
    </View>
  );
}
