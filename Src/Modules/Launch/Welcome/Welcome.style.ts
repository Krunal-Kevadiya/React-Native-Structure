import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { ApplicationStyles, Colors } from '@themes';
import type { StylePropsType } from './Welcome.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      ...ApplicationStyles.viewStyle,
      screenView: {
        backgroundColor: Colors.white,
        backgroundColorDark: Colors.primary
      }
    },
    themeType
  );
}
