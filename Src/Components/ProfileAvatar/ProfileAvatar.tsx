import _ from 'lodash';
import React, { useState } from 'react';
import { ImageStyle, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { isNotNullOrEmpty, isNullOrUndefined } from '@utils';
import type ProfileAvatarPropsType from './ProfileAvatar.type';
import { ImageOverlap } from './ImageOverlap';
import { ImageStatic } from './ImageStatic';
import { ImageText } from './ImageText';
import { ImageUrl } from './ImageUrl';

export default function ProfileAvatar({
  url,
  image,
  text,
  source,
  style,
  size,
  textStyle,
  svgStyle,
  onPress
}: ProfileAvatarPropsType): React.ReactElement {
  const [load, setLoad] = useState(false);
  const isUrl: boolean = isNotNullOrEmpty(url);
  const isImage: boolean = !isUrl && !isNullOrUndefined(image) && image !== -1;
  const isSource: boolean = !isNullOrUndefined(source);
  const isText: boolean = !isUrl && !isImage && isNotNullOrEmpty(text);
  const localStyle: ImageStyle | ViewStyle =
    isUrl && !load ? _.omit(StyleSheet.flatten(style), 'backgroundColor') : StyleSheet.flatten(style);

  return (
    <Pressable onPress={onPress}>
      <View style={localStyle}>
        {isUrl && (
          <ImageUrl
            url={url}
            //@ts-ignore
            imageStyle={localStyle}
            onLoading={(loading: boolean) => {
              setLoad(loading);
            }}
          />
        )}
        {isImage && <ImageStatic image={image as string} size={size} svgStyle={svgStyle} />}
        {isText && <ImageText text={text} textStyle={textStyle} />}
        {isSource && !load && <ImageOverlap source={source as string} size={size} style={style} svgStyle={svgStyle} />}
      </View>
    </Pressable>
  );
}
