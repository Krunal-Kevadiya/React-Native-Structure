import { FormikProps } from 'formik';
import React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { SignInFormModel } from '@models';
import type { ButtonStylePropsType, TextStylePropsType, ViewStylePropsType } from '@themes';

export type SignInRouteParamList = {
  SignIn: {
    email: string;
  };
};

export type UseSignInReturnType = {
  refSignIn: React.RefObject<FormikProps<SignInFormModel>>;
  onFormSubmit: (values: SignInFormModel) => void;
};

export type StylePropsType = {
  screenView: ViewStyle;
  logo: ImageStyle;
  logoSvg: ImageStyle;
  headerLeftImage: TextStyle;
  fabContainer: ViewStyle;
  fabButton: ViewStyle;
  fabText: TextStyle;
  icon: ImageStyle;
  orText: TextStyle;
  textPolicyDesc: TextStyle;
  policyDescContainer: ViewStyle;
  textInput: TextStyle;
} & ViewStylePropsType &
  TextStylePropsType &
  ButtonStylePropsType;
