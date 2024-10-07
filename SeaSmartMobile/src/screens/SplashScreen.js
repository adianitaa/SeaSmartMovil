import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing, Dimensions } from 'react-native';

export default function SplashScreen() {


  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View  style={styles.container}>
      <Text style={styles.title}>
        Bienvenidos
      </Text>
      <Image
        source={require('../../assets/olagif.gif')}
        style={{height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width}}
      />
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
  },
});
