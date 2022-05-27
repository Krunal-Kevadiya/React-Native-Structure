import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors, ApplicationStyles } from '@themes';
import { colorOpacity } from '@utils';
import type { StylePropsType } from './FullScreen.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      ...ApplicationStyles.viewStyle,
      containerStyle: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: colorOpacity(Colors.white, 0.9),
        backgroundColorDark: colorOpacity(Colors.primary, 0.9)
      }
    },
    themeType
  );
}
