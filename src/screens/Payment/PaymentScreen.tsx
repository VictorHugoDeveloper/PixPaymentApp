import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {PaymentMethod} from '../../components/PaymentMethod';
import {usePaymentLogic} from './PaymentLogic.tsx';
import {typography} from '../../theme/typography';
import {InstallmentsBottomSheet} from '../../components/InstallmentsBottomSheet';
import {formatCurrency} from '../../utils/formatters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import {CardBrandIcon} from '../../components/CardBrandIcon';

export default function PaymentScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    selectedMethod,
    error,
    fadeAnim,
    slideAnim,
    cardAnims,
    handlePayment,
    setSelectedMethod,
    mockData,
    loading,
    showInstallments,
    selectedInstallment,
    bottomSheetRef,
    handleSelectInstallment,
    handleInstallmentPress,
  } = usePaymentLogic(navigation);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}>
          <Text style={styles.sectionTitle}>Transferência Pix</Text>
          <Text style={styles.subtitle}>Escolha uma forma de pagamento</Text>
          <Text style={styles.subtitle}>Conta Midway</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}>
          <PaymentMethod
            title="Saldo em conta"
            subtitle={`Disponível: ${formatCurrency(mockData.account.balance)}`}
            selected={selectedMethod === 'balance'}
            onSelect={() => setSelectedMethod('balance')}
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
            alignItems: "center",
          }}>
          <Text style={[styles.subtitle, styles.marginTop]}>
            Cartões de crédito
          </Text>
        </Animated.View>

        {mockData.account.cards.map((card, index) => (
          <Animated.View 
            key={card.cardId}
            style={{
              opacity: fadeAnim,
              transform: [{translateY: cardAnims[index]}],
            }}>
            <PaymentMethod
              title={`Cartão ${card.brand}`}
              subtitle={`Final ****${card.cardNumber.slice(-4)}`}
              selected={selectedMethod === card.cardId}
              onSelect={() => setSelectedMethod(card.cardId)}
              leftIcon={<CardBrandIcon brand={card.brand} />}
            />

            {loading && selectedMethod === card.cardId && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#2B7069" />
              </View>
            )}

            {showInstallments && selectedMethod === card.cardId && (
              <TouchableOpacity
                style={styles.installmentSelector}
                onPress={handleInstallmentPress}>
                <Text style={styles.installmentText}>
                  {selectedInstallment
                    ? `${
                        selectedInstallment.installments
                      }x de R$ ${selectedInstallment.installmentAmount.toFixed(
                        2,
                      )}`
                    : 'Escolher parcelas'}
                </Text>
                <Text><Icon name="keyboard-arrow-right" size={30} color="#2B7069" /></Text>
              </TouchableOpacity>
            )}

            {selectedInstallment && selectedMethod === card.cardId && (
              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Valor a transferir</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(mockData.payment.amount)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Taxa do cartão</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(
                      selectedInstallment.fees.fixed.amount +
                      selectedInstallment.fees.installments.amount
                    )}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Taxa de parcelamento</Text>
                  <Text style={styles.detailValue}>-</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Valor a transferir + taxas
                  </Text>
                  <Text style={styles.detailValue}>
                    {selectedInstallment.installments}x {formatCurrency(selectedInstallment.installmentAmount)}
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>
        ))}
      </ScrollView>

      <InstallmentsBottomSheet
        bottomSheetRef={bottomSheetRef}
        installments={mockData.payment.simulation}
        onSelectInstallment={handleSelectInstallment}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.footer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Valor a ser pago</Text>
          <Text style={styles.amount}>
            {selectedInstallment
              ? `${selectedInstallment.installments}x de ${formatCurrency(selectedInstallment.installmentAmount)}`
              : formatCurrency(mockData.payment.amount)}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.payButton,
            !selectedMethod && styles.payButtonDisabled,
          ]}
          disabled={!selectedMethod}
          onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 50,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: typography.bold,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: typography.medium,
    marginBottom: 24,
  },
  marginTop: {
    marginTop: 24,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }
      : {
          elevation: 5,
        }),
  },
  amountContainer: {
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: '#666',
  },
  amount: {
    fontSize: 24,
    fontFamily: typography.bold,
  },
  payButton: {
    backgroundColor: '#2B7069',
    borderRadius: 30,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: typography.bold,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: typography.regular,
    textAlign: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  installmentSelector: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 14,
  },
  installmentText: {
    fontSize: 16,
    fontFamily: typography.medium,
    color: '#2B7069',
  },
  details: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: typography.medium,
  },
});
