import { I18nManager } from 'react-native';
import { CustomStyleSheet } from 'rn-custom-style-sheet';
import type { StylePropsType } from './OtpInput.type';

export default CustomStyleSheet.createScaled<StylePropsType>({
  defaultTextFieldStyle: {
    borderRadius: '2@ms',
    borderWidth: '1@vs',
    height: '45@ms',
    textAlign: 'center',
    width: '45@ms',
    paddingVertical: 0,
    borderBottomWidth: 0
  },
  touchableContainer: {
    height: '100%',
    width: '100%'
  },
  viewContainer: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%'
  }
});
