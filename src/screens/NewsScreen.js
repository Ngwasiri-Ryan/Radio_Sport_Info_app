import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No News Yet</Text>
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000000',
  },
});
