import { StyleSheet } from 'react-native';

const colors = {
  verde: '#4BB543',
  vermelho: '#FF4444',
  branco: 'white',
};

const styles = StyleSheet.create({
  toastSuccess: {
    width: '90%',
    backgroundColor: colors.verde,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  toastError: {
    width: '90%',
    backgroundColor: colors.vermelho,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  toastText1: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 16,
  },
  toastText2: {
    color: colors.branco,
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
