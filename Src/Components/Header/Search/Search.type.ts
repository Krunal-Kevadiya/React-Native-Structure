import React from 'react';
import { ImageStyle, TextInput, TextStyle, ViewStyle } from 'react-native';
import type { LineStylePropsType } from '@themes';

type TextInputPropsType = React.ComponentProps<typeof TextInput>;

type LocalSearchPropsType = {
  isLowerCase: boolean;
  labelCancel: string;
  onSearchQuery: (search: string) => void;
  handleCancel: () => void;
};
export type SearchPropsType = Partial<LocalSearchPropsType> & TextInputPropsType;

export type StylePropsType = {
  centerSide: ViewStyle;
  container: ViewStyle;
  inputSearch: TextStyle;
  searchContainer: ViewStyle;
  textLabel: TextStyle;
  imageSearch: ImageStyle;
} & LineStylePropsType;
