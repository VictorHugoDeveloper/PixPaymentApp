import {BottomSheetRefProps} from '../BottomSheet/types';

export interface InstallmentType {
  amountToPay: number;
  installmentAmount: number;
  installments: number;
  fees: {
    fixed: {
      amount: number;
      percentage: number;
    };
    installments: {
      amount: number;
      percentage: number;
    };
  };
}

export interface InstallmentsBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  installments: InstallmentType[];
  onSelectInstallment: (installment: InstallmentType) => void;
}

export interface InstallmentOptionProps {
  installment: InstallmentType;
  onSelect: (installment: InstallmentType) => void;
} 