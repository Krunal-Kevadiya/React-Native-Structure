import React from 'react';
import { FlatListProps, TextStyle, ViewStyle } from 'react-native';

export type BottomSheetPropsType<T> = Partial<{
  title: string;
  message: string;
  onSwipeComplete: () => void;
  onBackButtonPress: () => void;
  children: React.ReactElement;
}> &
  FlatListProps<T>;

export type BottomSheetHandleType = Required<{
  show: () => void;
  hide: () => void;
}>;

export type StylePropsType = {
  containerViewStyle: ViewStyle;
  customBackdrop: ViewStyle;
  list: ViewStyle;
  listMargin: ViewStyle;
  messageText: TextStyle;
  popupContainerStyle: ViewStyle;
  popupDismissLine: ViewStyle;
  popupStyle: ViewStyle;
  popupView: ViewStyle;
  titleText: TextStyle;
};
