export interface Card {
    cardId: string;
    name: string;
    securityCode: string;
    cardNumber: string;
    holder: string;
    expirationDate: string;
    brand: string;
    favorite: boolean;
    used: boolean;
  }
  
  export interface Account {
    accountId: string;
    balance: number;
    currency: string;
    status: string;
    owner: {
      name: string;
      id: string;
    };
    cards: Card[];
  }
  
  export interface PaymentSimulation {
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
  
  export interface Payment {
    transactionId: string;
    amount: number;
    currency: string;
    receiver: {
      name: string;
      id: string;
    };
    method: string;
    simulation: PaymentSimulation[];
  } 