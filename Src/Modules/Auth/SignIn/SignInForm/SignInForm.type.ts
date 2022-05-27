import { FormikProps } from 'formik';
import { TextStyle, ViewStyle } from 'react-native';
import { SignInFormModel } from '@models';
import type { ButtonStylePropsType, LineStylePropsType, ViewStylePropsType } from '@themes';

export type SignInFormPropsType = FormikProps<SignInFormModel>;

export type StylePropsType = {
  formContainer: ViewStyle;
  textInput: TextStyle;
  textInputContainer: ViewStyle;
  button: ViewStyle;
  disabledButton: ViewStyle;
  buttonText: TextStyle;
  signUpDescContainer: ViewStyle;
  signUpContainer: ViewStyle;
  textSignInDesc: TextStyle;
} & ViewStylePropsType &
  ButtonStylePropsType &
  LineStylePropsType;
