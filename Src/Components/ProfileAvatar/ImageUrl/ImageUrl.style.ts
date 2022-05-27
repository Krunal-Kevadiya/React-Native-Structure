import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StylePropsType } from './ImageUrl.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      imageStyle: {
        tintColor: Colors.gray,
        tintColorDark: Colors.gray
      }
    },
    themeType
  );
}
