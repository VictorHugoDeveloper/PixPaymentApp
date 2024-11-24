import {StyleSheet, Platform} from 'react-native';
import {typography} from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: typography.bold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: '#666',
    marginBottom: 24,
  },
  installmentOption: {
    marginTop: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    marginBottom: 1,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }
      : {
          elevation: 3,
        }),
  },
  installmentText: {
    fontSize: 18,
    fontFamily: typography.semiBold,
    color: '#00726D',
  },
  totalText: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: '#666',
    marginTop: 4,
  },
  feesText: {
    fontSize: 12,
    fontFamily: typography.regular,
    color: '#999',
    marginTop: 2,
  },
});
