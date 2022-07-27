import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { StringConst } from '@constants';
import { useDebouncedCallback } from '@hooks';
import type { ImagePickerType } from './ImagePicker.type';
import styleSheet from './ImagePicker.style';

export default function ImagePicker({
  item,
  bottomSheetRef,
  handleTakePhoto,
  handleChooseLibrary
}: ImagePickerType): React.ReactElement {
  const styles = useTheme(styleSheet);
  const handlePress = useDebouncedCallback<() => void>(
    () => {
      switch (item) {
        case StringConst.imagePicker.listSelectAPhoto[0]:
          handleTakePhoto();
          break;
        case StringConst.imagePicker.listSelectAPhoto[1]:
          handleChooseLibrary();
          break;
        default:
          bottomSheetRef?.current?.hide();
      }
    },
    500,
    { leading: true, trailing: false }
  );

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles.actionSheetItem}>{item}</Text>
    </Pressable>
  );
}
