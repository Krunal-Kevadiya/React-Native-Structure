import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import { colorOpacity } from '@utils';
import type { ThemeType } from 'rn-custom-style-sheet';
import { StylePropsType } from './ImageOverlap.type';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      imageOverlap: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: colorOpacity(Colors.white, 0.2),
        backgroundColorDark: colorOpacity(Colors.primary, 0.2)
      },
      svgColor: {
        color: Colors.primary,
        colorDark: Colors.white
      }
    },
    themeType
  );
}
