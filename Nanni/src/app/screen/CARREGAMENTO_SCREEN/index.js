import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#A349A4" />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}
