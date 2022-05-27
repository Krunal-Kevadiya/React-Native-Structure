import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StylePropsType } from './BothSide.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      addMargin: {
        marginHorizontal: '10@s'
      },
      bothSide: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      textLabel: {
        fontSize: '16@ms',
        color: Colors.primary,
        colorDark: Colors.white
      }
    },
    themeType
  );
}
