import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StylePropsType } from './FabButton.type';
import type { ThemeType } from 'rn-custom-style-sheet';

export default function styleSheet(themeType: ThemeType) {
  return CustomStyleSheet.createScaledTheme<StylePropsType>(
    {
      container: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        zIndex: 10
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '5@s',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        shadowOffset: { width: '2@s', height: '2@s' },
        shadowOpacity: 5.0,
        shadowRadius: '2@s',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.secondary,
        shadowColor: Colors.gray
      }
    },
    themeType
  );
}
