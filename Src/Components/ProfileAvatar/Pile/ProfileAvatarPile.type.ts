import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { UserResponse } from '@models';

export type ProfileAvatarPilePropsType = Partial<{
  faces: UserResponse[];
  overflow: number;
  circleSize: number;
  hideOverflow: boolean;
  containerStyle: ViewStyle;
  circleStyle: ViewStyle;
  imageStyle: ImageStyle;
  overflowStyle: ViewStyle;
  overflowLabelStyle: TextStyle;
}> &
  typeof defaultProps;

export type StylePropsType = {
  container: ViewStyle;
};

export const defaultProps = {
  circleSize: 42,
  overflow: 8,
  hideOverflow: false
};
