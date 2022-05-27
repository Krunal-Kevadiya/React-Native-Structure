import { StyleSheet } from 'react-native';
import type { StylePropsType } from './GlowPadButton.type';

export default StyleSheet.create<StylePropsType>({
  centerView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pulse: {
    position: 'absolute'
  }
});
