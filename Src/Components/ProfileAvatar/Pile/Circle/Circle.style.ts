import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StylePropsType } from './Circle.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      overflow: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      overflowLabel: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        letterSpacing: -1,
        color: Colors.white,
        colorDark: Colors.primary
      },
      container: {
        backgroundColor: Colors.secondary
      }
    },
    themeType
  );
}
