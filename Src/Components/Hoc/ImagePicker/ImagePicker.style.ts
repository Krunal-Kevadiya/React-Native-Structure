import { CustomStyleSheet } from 'rn-custom-style-sheet';
import type { StylePropsType } from './ImagePicker.type';

export default CustomStyleSheet.createScaled<StylePropsType>({
  listContainer: {
    paddingHorizontal: '20@s'
  }
});
