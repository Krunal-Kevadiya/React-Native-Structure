import { ViewStyle } from 'react-native';

export type SwitchPropsType = Required<{
  handleOnPress: (value: boolean) => void;
  activeTrackColor: string;
  inActiveTrackColor: string;
  activeThumbColor: string;
  inActiveThumbColor: string;
  value: boolean;
  disabled: boolean;
}> &
  typeof defaultProps;

export const defaultProps = {
  disabled: false,
  value: false
};

export type StylePropsType = {
  circleStyle: ViewStyle;
  containerStyle: ViewStyle;
  shadowValue: ViewStyle;
};
