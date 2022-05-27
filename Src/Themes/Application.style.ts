import { TextStyle, ViewStyle } from 'react-native';
import { Fonts } from '@assets';
import { colorOpacity } from '@utils';
import type { MyViewStyle, MyTextStyle } from 'rn-custom-style-sheet';
import Colors from './Colors';
import { isIos } from './Metrics';

export type ViewStylePropsType = {
  centerAlign: ViewStyle;
  flexColumn: ViewStyle;
  flexRow: ViewStyle;
  screen: ViewStyle;
};
const viewStyle: ViewStylePropsType = Object.freeze({
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  screen: {
    flex: 1
  }
});

export type LineStylePropsType = {
  bottomLine: ViewStyle;
  normalLine: ViewStyle;
};
type LocalLineStylePropsType = {
  bottomLine: MyViewStyle;
  normalLine: MyViewStyle;
};
const lineStyle: LocalLineStylePropsType = {
  bottomLine: {
    borderBottomWidth: '0.8@s',
    borderBottomColor: colorOpacity(Colors.primary, 0.3),
    borderBottomColorDark: colorOpacity(Colors.white, 0.3)
  },
  normalLine: {
    height: '0.8@s',
    width: '100%',
    backgroundColor: colorOpacity(Colors.primary, 0.2),
    backgroundColorDark: colorOpacity(Colors.white, 0.2)
  }
};

export type TextStylePropsType = {};
type LocalTextStylePropsType = {};
const textStyle: LocalTextStylePropsType = Object.freeze({});

export type ButtonStylePropsType = {
  buttonBorderStyle: ViewStyle;
  buttonBottomMargin: ViewStyle;
  buttonContainer: ViewStyle;
  buttonTopMargin: ViewStyle;
  spinnerButton: ViewStyle;
  textLabel: TextStyle;
};
export type LocalButtonStylePropsType = {
  buttonBorderStyle: MyViewStyle;
  buttonBottomMargin: MyViewStyle;
  buttonContainer: ViewStyle;
  buttonTopMargin: MyViewStyle;
  spinnerButton: MyViewStyle;
  textLabel: MyTextStyle;
};
const buttonStyle: LocalButtonStylePropsType = {
  buttonBorderStyle: {
    borderRadius: '5@s',
    borderStyle: 'solid',
    borderWidth: '2@s'
  },
  buttonBottomMargin: {
    marginBottom: isIos ? '40@vs' : '35@vs'
  },
  buttonContainer: {
    flex: 0,
    zIndex: 0
  },
  buttonTopMargin: {
    marginTop: '15@vs'
  },
  spinnerButton: {
    borderRadius: isIos ? '40@s' : '50@s',
    height: isIos ? '40@s' : '50@s',
    width: '90@wp'
  },
  textLabel: {
    fontFamily: Fonts.semibold,
    fontSize: '14@ms'
  }
};

const ApplicationStyles = {
  viewStyle,
  lineStyle,
  buttonStyle,
  textStyle
};

export default ApplicationStyles;
