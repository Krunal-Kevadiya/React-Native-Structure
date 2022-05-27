import { CustomStyleSheet } from 'rn-custom-style-sheet';
import type { StylePropsType } from './Switch.type';

export const SwitchWidth: number = 60;

export default CustomStyleSheet.createScaled<StylePropsType>({
  circleStyle: {
    borderRadius: '24@ms',
    height: '24@ms',
    width: '24@ms'
  },
  containerStyle: {
    borderRadius: '36.5@s',
    paddingHorizontal: '2@s',
    paddingVertical: '2@vs',
    width: `${SwitchWidth}@s`,
    height: '30@s'
  },
  shadowValue: {
    elevation: '4@s',
    shadowOffset: {
      width: 0,
      height: '2@s'
    },
    shadowOpacity: 0.23,
    shadowRadius: '2.62@s'
  }
});
