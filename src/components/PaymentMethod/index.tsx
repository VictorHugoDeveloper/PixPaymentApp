import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {typography} from '../../theme/typography';

type PaymentMethodProps = {
  title: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
  leftIcon?: React.ReactNode;
};

export const PaymentMethod = ({
  title,
  subtitle,
  selected,
  onSelect,
  leftIcon,
}: PaymentMethodProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onSelect}>
      <View style={styles.content}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selected: {
    borderColor: '#2B7069',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: typography.medium,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: typography.regular,
    color: '#666',
    marginTop: 4,
  },
  radio: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#2B7069',
    backgroundColor: 'white',
  },
  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#2B7069',
  },
});
