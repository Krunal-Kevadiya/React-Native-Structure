import React from 'react';
import { TextStyle } from 'react-native';
import type { BottomSheetHandleType } from '../../BottomSheet';

export type ImagePickerType = Required<{
  item: string;
  bottomSheetRef: React.RefObject<BottomSheetHandleType>;
  handleTakePhoto: () => void;
  handleChooseLibrary: () => void;
}>;

export type StylePropsType = {
  actionSheetItem: TextStyle;
};
