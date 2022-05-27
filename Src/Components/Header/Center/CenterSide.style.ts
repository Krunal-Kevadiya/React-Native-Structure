import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StylePropsType } from './CenterSide.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      centerSide: {
        left: 0,
        position: 'absolute',
        right: 0
      },
      imageTitle: {
        tintColor: Colors.primary,
        tintColorDark: Colors.white
      },
      centerContainerSide: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      centerImageTitle: {
        alignSelf: 'center'
      },
      textTitle: {
        fontSize: '16@ms',
        color: Colors.primary,
        colorDark: Colors.white
      },
      centerTextTitle: {
        textAlign: 'center'
      }
    },
    themeType
  );
}
