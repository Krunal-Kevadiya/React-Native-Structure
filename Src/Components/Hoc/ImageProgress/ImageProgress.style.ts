import { StyleSheet } from 'react-native';
import type { StylePropsType } from './ImageProgress.type';

export default StyleSheet.create<StylePropsType>({
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
