import React, { forwardRef } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { isNotNullOrEmpty } from '@utils';
import type { ToastHandleType, ToastPropsType, UseToastReturnType } from './Toast.type';
import { Icon } from '../Icon';
import { GestureRecognizer } from './Gesture';
import useToast from './Toast.hook';
import styles from './Toast.style';
import { defaultProps } from './Toast.type';

function CustomToast(
  {
    translucent = defaultProps.translucent,
    numberOfLines = defaultProps.numberOfLines,
    toastPosition = defaultProps.toastPosition
  }: ToastPropsType,
  ref: React.Ref<ToastHandleType>
): React.ReactElement {
  const { data, offset, minHeight, handlerSwipeUp, handleLayout }: UseToastReturnType = useToast(
    translucent,
    toastPosition,
    ref
  );
  const customSpringStyles = useAnimatedStyle<ViewStyle>(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      transform: [
        {
          translateY: withSpring(offset.value, {
            damping: 20,
            stiffness: 90
          })
        }
      ]
    };
  });
  const tintStyle = isNotNullOrEmpty(data?.imageTint) ? { tintColor: data?.imageTint } : null;
  const isSrc = data?.image !== undefined && data?.image !== null;
  const containerStyle: ViewStyle = {
    height: minHeight,
    justifyContent: 'flex-end'
  };

  return (
    <Animated.View style={StyleSheet.compose<ViewStyle>({ [toastPosition]: 0 }, customSpringStyles)}>
      <View style={containerStyle}>
        <View style={styles.contentContainerStyle} onLayout={handleLayout}>
          {isNotNullOrEmpty(data?.message) && (
            <Text numberOfLines={numberOfLines} style={styles.messageStyle}>
              {data?.message}
            </Text>
          )}
          {isSrc && (
            //@ts-ignore
            <Icon
              type="svg"
              //@ts-ignore
              style={StyleSheet.compose(styles.imageStyle, tintStyle ?? styles.tintColor)}
              source={data?.image}
            />
          )}
        </View>
        <GestureRecognizer style={StyleSheet.compose(styles.absoluteView, containerStyle)} onSwipeUp={handlerSwipeUp} />
      </View>
    </Animated.View>
  );
}

const Toast = forwardRef(CustomToast) as (
  props: ToastPropsType & { ref: React.Ref<ToastHandleType> }
) => ReturnType<typeof CustomToast>;
export default Toast;
