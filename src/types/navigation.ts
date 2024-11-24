export type RootStackParamList = {
  Splash: undefined;
  Payment: undefined;
  ProcessingPayment: undefined;
  PaymentReceipt: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 