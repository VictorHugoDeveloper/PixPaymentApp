import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CONSTANTS = {
  SCREEN_HEIGHT,
  MAX_TRANSLATE_Y: -SCREEN_HEIGHT + 50,
  SNAP_POINTS: [-300, -SCREEN_HEIGHT / 2, 0],
  SPRING_CONFIG: {
    damping: 50,
    stiffness: 300,
  },
} as const; 