import { StyleSheet } from 'react-native';

const colors = {
  primary: '#A349A4',
  secondary: '#42FFA3',
  text: '#000000',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: colors.text,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: colors.text,
  },
  botao: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15, // Espaçamento entre os botões
  },
  botaoTexto: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
