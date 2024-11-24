import {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {mockData} from '../../../mocks/paymentData';

export const usePaymentAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [cardAnims] = useState(
    mockData.account.cards.map(() => new Animated.Value(50)),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      ...cardAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 0,
          duration: 600,
          delay: 300 + index * 150,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ),
    ]).start();
  }, []);

  return {
    fadeAnim,
    slideAnim,
    cardAnims,
  };
}; 