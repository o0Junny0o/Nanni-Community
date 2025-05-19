import { StyleSheet } from 'react-native';

const colors = {
  preto: '#000',
  marrom: '#333',
};

const styles = StyleSheet.create({
  label: {
    width: 80, // mesmo valor de dataPointLabelWidth
    textAlign: 'center', // centraliza o texto no contêiner
    fontSize: 12,
    color: colors.preto,
  },
  textStyle: {
    color: colors.marrom,
    fontSize: 12,
  },
  container: {
    paddingTop: 10
  }
});

export { styles, colors };
