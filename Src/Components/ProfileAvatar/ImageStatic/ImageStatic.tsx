import React from 'react';
import type ImageStaticPropsType from './ImageStatic.type';
import { Icon } from '../../Icon';

export default function ImageStatic({ image, size, svgStyle }: ImageStaticPropsType): React.ReactElement {
  return <Icon type="svg" size={size} source={image ?? ''} svgStyle={svgStyle} />;
}
