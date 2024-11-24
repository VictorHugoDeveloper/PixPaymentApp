import React from 'react';
import {Text} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import BottomSheet from '../BottomSheet';
import {styles} from './styles';
import {InstallmentOption} from './components/InstallmentOption';
import {InstallmentsBottomSheetProps} from './types';

export const InstallmentsBottomSheet: React.FC<InstallmentsBottomSheetProps> = ({
  bottomSheetRef,
  installments,
  onSelectInstallment,
}) => {
  return (
    <BottomSheet ref={bottomSheetRef}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Text style={styles.title}>Parcelas do pagamento</Text>
        <Text style={styles.subtitle}>
          O destinatário receberá à vista e você pagará parcelado.
        </Text>
        <ScrollView 
          style={{maxHeight: 460}}
          showsVerticalScrollIndicator={false}
          bounces={false}
          nestedScrollEnabled={true}>
          {installments.map(installment => (
            <InstallmentOption
              key={installment.installments}
              installment={installment}
              onSelect={onSelectInstallment}
            />
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </BottomSheet>
  );
};
