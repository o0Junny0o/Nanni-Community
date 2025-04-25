import { View, ActivityIndicator } from 'react-native';
import styles from './style';

const CarregandoOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#A349A4" />
    </View>
  );
};

export { CarregandoOverlay };
