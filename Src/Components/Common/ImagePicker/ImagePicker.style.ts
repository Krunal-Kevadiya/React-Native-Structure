import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StylePropsType } from './ImagePicker.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      actionSheetItem: {
        fontSize: '18@ms',
        paddingVertical: '10@vs',
        colorDark: Colors.white,
        color: Colors.primary
      }
    },
    themeType
  );
}
