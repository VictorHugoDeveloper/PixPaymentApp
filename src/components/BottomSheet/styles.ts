import { StyleSheet } from 'react-native';
import { CONSTANTS } from './constants';

export const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: CONSTANTS.SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: CONSTANTS.SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 2,
    padding: 20,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
}); 