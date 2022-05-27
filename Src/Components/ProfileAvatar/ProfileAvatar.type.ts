import { TextStyle, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';

type ProfileAvatarPropsType = {
  url?: string;
  size?: number;
  image?: string | number;
  text?: string;
  source?: string | number;
  style: ViewStyle;
  textStyle?: TextStyle;
  svgStyle?: XmlProps;
  onPress?: () => void;
};

export default ProfileAvatarPropsType;
