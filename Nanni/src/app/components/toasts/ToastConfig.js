import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../../styles/styles';

// Configuração do toast
const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.toastSuccess}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
  warning: ({ text1, text2 }) => (
    <View style={styles.toastWarning}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.toastError}>
      <Text style={styles.toastText1}>{text1}</Text>
      <Text style={styles.toastText2}>{text2}</Text>
    </View>
  ),
};

export { toastConfig };
