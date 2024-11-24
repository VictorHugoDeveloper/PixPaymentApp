import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Payment: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SplashProps {
  navigation: NavigationProp;
}

export function Splash({ navigation }: SplashProps) {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  const handleAnimationFinish = () => {
    navigation.replace('Payment');
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/splash.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        speed={1}
        resizeMode="contain"
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  animation: {
    width: 300,
    height: 300,
  },
}); 