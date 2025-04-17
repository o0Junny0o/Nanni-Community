import { StyleSheet } from 'react-native';

const colors = {
  primary: '#A349A4',
  background: '#fff',
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
  },
});

export default styles;
