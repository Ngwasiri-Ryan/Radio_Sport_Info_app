// CustomSplashScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import colors from '../constants/theme';

const CustomSplashScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      
      setTimeout(() => {
        navigation.replace('WelcomeScreen'); 
      }, 1000);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>RadioSportInfo</Text>
       
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff', // Your primary color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
});

export default CustomSplashScreen;
