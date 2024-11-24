import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {typography} from '../../theme/typography';
import {RootStackParamList} from '../../types/navigation';
import LottieView from 'lottie-react-native';

export function ProcessingPayment() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('PaymentReceipt');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/animations/loading.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        speed={1}
        resizeMode="contain"
      />
      <Text style={styles.title}>Processando</Text>
      <Text style={styles.subtitle}>sua transferência</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00726D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: typography.bold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: typography.bold,
  },
  animation: {
    width: 300,
    height: 300,
  },
});
