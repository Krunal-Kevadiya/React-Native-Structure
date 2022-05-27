import { TextStyle, ViewStyle } from 'react-native';

export type MovableViewPropsType = Partial<{
  message: string;
  isBtnVisible: boolean;
}>;

export type StylePropsType = {
  container: ViewStyle;
  textHeader: TextStyle;
  buttonView: ViewStyle;
  textButton: TextStyle;
};
