import {useEffect, useCallback} from 'react';
import {usePaymentAnimation} from './hooks/usePaymentAnimation';
import {usePaymentState} from './hooks/usePaymentState';
import {mockData} from '../../mocks/paymentData';
import {InstallmentType} from '../../components/InstallmentsBottomSheet/types';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

export const usePaymentLogic = (navigation: NavigationProp<RootStackParamList>) => {
  const animation = usePaymentAnimation();
  const state = usePaymentState();

  useEffect(() => {
    if (state.selectedMethod !== 'balance') {
      state.setLoading(true);
      const timer = setTimeout(() => {
        state.setLoading(false);
        state.setShowInstallments(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [state.selectedMethod]);

  const handleSelectInstallment = (installment: InstallmentType) => {
    state.setSelectedInstallment(installment);
    handleInstallmentPress();
  };

  const handleInstallmentPress = useCallback(() => {
    const isActive = state.bottomSheetRef?.current?.isActive();
    if (isActive) {
      state.bottomSheetRef?.current?.scrollTo(0);
    } else {
      state.bottomSheetRef?.current?.scrollTo(-750);
    }
  }, []);

  const handleMethodSelect = (methodId: string) => {
    state.setSelectedMethod(methodId);
    state.setShowInstallments(false);
    state.setSelectedInstallment(null);
  };

  const handlePayment = () => {
    state.setError('');

    if (!state.selectedMethod) {
      state.setError('Selecione uma forma de pagamento');
      return;
    }

    if (!mockData.payment.amount || mockData.payment.amount <= 0) {
      state.setError('Valor de pagamento inválido');
      return;
    }

    if (state.selectedMethod === 'balance' && mockData.account.balance < mockData.payment.amount) {
      state.setError('Saldo insuficiente para realizar o pagamento');
      return;
    }

    navigation.navigate('ProcessingPayment');
  };

  return {
    ...state,
    ...animation,
    handlePayment,
    handleSelectInstallment,
    handleInstallmentPress,
    setSelectedMethod: handleMethodSelect,
    mockData,
  };
}; 