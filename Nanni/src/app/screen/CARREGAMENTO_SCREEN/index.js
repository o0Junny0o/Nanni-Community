import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1D5DB5" />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}