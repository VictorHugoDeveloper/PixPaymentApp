import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {typography} from '../../theme/typography';
import {mockData} from '../../mocks/paymentData';
import {formatCurrency} from '../../utils/formatters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../types/navigation';
import LottieView from 'lottie-react-native';

export function PaymentReceipt() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleClose = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <LottieView
          source={require('../../../assets/animations/finished.json')}
          autoPlay
          loop={false}
          style={styles.animation}
          speed={1}
          resizeMode="contain"
        />
        <Text style={styles.title}>Pix realizado{'\n'}com sucesso!</Text>

        <View style={styles.receiptContainer}>
          <Text style={styles.label}>Para</Text>
          <Text style={styles.value}>{mockData.payment.receiver.name}</Text>

          <View style={styles.separator} />

          <Text style={styles.label}>Valor</Text>
          <Text style={styles.amount}>
            {formatCurrency(mockData.payment.amount)}
          </Text>

          <View style={styles.separator} />

          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>
            {new Date().toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: typography.bold,
    color: '#000000',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 48,
  },
  receiptContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: '#666666',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontFamily: typography.semiBold,
    color: '#000000',
    marginBottom: 16,
  },
  amount: {
    fontSize: 24,
    fontFamily: typography.bold,
    color: '#00726D',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  animation: {
    width: 100,
    height: 100,
  },
});
