import { StyleSheet } from 'react-native';

const colors = {
  MediumSkyBlue: '#5d90d6',
  DarkRoyalBlue: '#163690',
  MidnightBlue: '#071934',
  VividBlue: '#1D5DB5',
  SoftLilac: '#B88CB4',
  white: '#FFFFFF',
  black: '#000000',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150, // Ajuste o tamanho conforme necessário
    height: 150, // Ajuste o tamanho conforme necessário
    marginBottom: 30,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.black,
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: colors.black,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.SoftLilac, // Cor da borda do input
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: colors.black,
  },
  botao: {
    backgroundColor: colors.VividBlue, // Cor do botão
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15, // Espaçamento entre os botões
  },
  botaoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;