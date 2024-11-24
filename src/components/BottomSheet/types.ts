import {ReactNode} from 'react';
import { View, ViewStyle } from 'react-native';
import {
    AnimatedProps,
    SharedValue,
  } from 'react-native-reanimated';
  import { Gesture } from 'react-native-gesture-handler';

export type BottomSheetProps = {
  children?: ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

export type BackdropProps = {
  onPress: () => void;
  style: ViewStyle;
  animatedProps: AnimatedProps<any>;
};

export type SheetContentProps = {
  gesture: ReturnType<typeof Gesture.Pan>;
  contentStyle: ViewStyle;
  children: ReactNode;
};

export type PanGestureProps = {
  translateY: SharedValue<number>;
  context: SharedValue<{y: number}>;
  scrollTo: (destination: number) => void;
};

export type AnimatedStylesProps = {
  translateY: SharedValue<number>;
  active: SharedValue<boolean>;
};
