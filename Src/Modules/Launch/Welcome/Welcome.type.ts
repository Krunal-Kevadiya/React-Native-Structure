import { ViewStyle } from 'react-native';
import type { ViewStylePropsType } from '@themes';

export type WelcomeRouteParamList = {
  Welcome: {
    routeName: string;
  };
};

export type StylePropsType = {
  screenView: ViewStyle;
} & ViewStylePropsType;
