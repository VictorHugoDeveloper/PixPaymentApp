import {useState, useRef} from 'react';
import {BottomSheetRefProps} from '../../../components/BottomSheet/types';
import {InstallmentType} from '../../../components/InstallmentsBottomSheet/types';

export const usePaymentState = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInstallments, setShowInstallments] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentType | null>(null);
  const [error, setError] = useState<string>('');
  
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  return {
    selectedMethod,
    setSelectedMethod,
    loading,
    setLoading,
    showInstallments,
    setShowInstallments,
    selectedInstallment,
    setSelectedInstallment,
    error,
    setError,
    bottomSheetRef,
  };
}; 