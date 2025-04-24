import { StyleSheet } from 'react-native';

const colors = {
  white: '#fff',
  lightGray: '#f5f5f5',
  gray: '#e0e0e0',
  purple: '#B88CB4',
  blue: '#1D5DB5',
  blueLight: '#5d90d6',
  textDark: '#333',
  borderGray: '#ccc',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: colors.blue,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  descricao: {
    fontSize: 14,
    color: colors.gray,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  mensagem: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  enviada: {
    backgroundColor: colors.blueLight,
    alignSelf: 'flex-end',
  },
  recebida: {
    backgroundColor: colors.purple,
    alignSelf: 'flex-start',
  },
  mensagemTexto: {
    color: colors.white,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: colors.textDark,
  },
  botaoEnviar: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  botaoTexto: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
