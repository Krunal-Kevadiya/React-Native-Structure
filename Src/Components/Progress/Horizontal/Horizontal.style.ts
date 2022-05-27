import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '@themes';
import type { StylePropsType } from './Horizontal.type';

export default StyleSheet.create<StylePropsType>({
  ...ApplicationStyles.viewStyle,
  containerStyle: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
