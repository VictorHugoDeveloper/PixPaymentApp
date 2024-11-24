import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles.tsx';
import {InstallmentOptionProps} from '../types.tsx';
import {formatCurrency} from '../../../utils/formatters';

export const InstallmentOption: React.FC<InstallmentOptionProps> = ({
  installment,
  onSelect,
}) => (
  <TouchableOpacity
    style={styles.installmentOption}
    onPress={() => onSelect(installment)}>
    <Text style={styles.installmentText}>
      {installment.installments}x de {formatCurrency(installment.installmentAmount)}
    </Text>
  </TouchableOpacity>
); 