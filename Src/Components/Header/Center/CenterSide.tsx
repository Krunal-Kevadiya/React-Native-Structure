import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useMyTheme } from 'rn-custom-style-sheet';
import { isNotNullOrEmpty } from '@utils';
import type { CenterSidePropsType } from './CenterSide.type';
import { Icon } from '../../Icon';
import styleSheet from './CenterSide.style';

export default function CenterSide({
  label,
  onPress,
  viewStyle,
  textStyle,
  svgStyle,
  imageStyle,
  isLeftAlign,
  ...OtherProps
}: CenterSidePropsType): React.ReactElement {
  const styles = useMyTheme(styleSheet);

  return (
    <Pressable
      style={StyleSheet.flatten([styles.centerSide, viewStyle, !isLeftAlign && styles.centerContainerSide])}
      onPress={onPress}
    >
      {isNotNullOrEmpty(label) && (
        <Text style={StyleSheet.flatten([styles.textTitle, textStyle, !isLeftAlign && styles.centerTextTitle])}>
          {label}
        </Text>
      )}
      {isNotNullOrEmpty(OtherProps.type) && (
        <Icon
          size={24}
          {...OtherProps}
          style={StyleSheet.flatten([styles.imageTitle, imageStyle, !isLeftAlign && styles.centerImageTitle])}
          svgStyle={svgStyle}
        />
      )}
    </Pressable>
  );
}
