import React, {useCallback, useImperativeHandle} from 'react';
import {View, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {CONSTANTS} from './constants';
import {styles} from './styles';
import {
  BottomSheetProps,
  BottomSheetRefProps,
  BackdropProps,
  PanGestureProps,
  SheetContentProps,
  AnimatedStylesProps,
} from './types';

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({children}, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({y: 0});

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, CONSTANTS.SPRING_CONFIG);
    }, []);

    const isActive = useCallback(() => active.value, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    const panGesture = usePanGesture({translateY, context, scrollTo});
    const animatedStyles = useAnimatedStyles({translateY, active});

    return (
      <>
        <Backdrop onPress={() => scrollTo(0)} {...animatedStyles.backdrop} />
        <SheetContent
          gesture={panGesture}
          contentStyle={animatedStyles.bottomSheet}>
          <View style={styles.line} />
          {children}
        </SheetContent>
      </>
    );
  },
);

const Backdrop = ({onPress, style, animatedProps}: BackdropProps) => (
  <Animated.View
    onTouchStart={onPress}
    animatedProps={animatedProps}
    style={[styles.backdrop, style]}
  />
);

const SheetContent = ({gesture, contentStyle, children}: SheetContentProps) => (
  <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomSheetContainer, contentStyle]}>
      {children}
    </Animated.View>
  </GestureDetector>
);

const usePanGesture = ({translateY, context, scrollTo}: PanGestureProps) => {
  return Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = Math.max(
        event.translationY + context.value.y,
        CONSTANTS.MAX_TRANSLATE_Y,
      );
    })
    .onEnd(() => {
      const endPosition = translateY.value;
      const closestPoint = CONSTANTS.SNAP_POINTS.reduce((prev, curr) =>
        Math.abs(curr - endPosition) < Math.abs(prev - endPosition)
          ? curr
          : prev,
      );
      scrollTo(closestPoint);
    })
    .simultaneousWithExternalGesture(Gesture.Native())
    .withTestId('bottom-sheet-pan-gesture');
};

const useAnimatedStyles = ({translateY, active}: AnimatedStylesProps) => {
  const bottomSheet = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [CONSTANTS.MAX_TRANSLATE_Y + 50, CONSTANTS.MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active.value ? 0.5 : 0),
    zIndex: active.value ? 1 : -1,
  }));

  const backdropProps = useAnimatedProps(
    () =>
      ({
        pointerEvents: active.value ? 'auto' : 'none',
      } as const),
  );

  return {
    bottomSheet,
    backdrop: {
      style: backdropStyle,
      animatedProps: backdropProps,
    },
  };
};

export default BottomSheet;
