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
    flexDirection: 'row', // Adicionado para alinhar os elementos horizontalmente
    justifyContent: 'flex-start', // Alinha os elementos ao início (esquerda)
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1, // Permite que o título se expanda e empurre outros elementos para a direita
    textAlign: 'center', // Centraliza o texto do título
  },
  headerPerfilImage: {
    width: 40, // Defina o tamanho desejado para a imagem de perfil
    height: 40,
    borderRadius: 20, // Para torná-la redonda
    marginRight: 10, // Espaçamento à direita da imagem
  },
  perfilContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
  },
  descricao: {
    fontSize: 14,
    color: colors.gray,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  mensagemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alinha os itens ao topo
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
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
  mensagemTextoContainer: {
    flex: 1, // Ocupa o espaço restante
    marginLeft: 10, // Espaçamento entre a foto e o texto
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
  },
  mensagemData: {
    fontSize: 12,
    color: colors.gray,
    alignSelf: 'flex-end',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalExcluir: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '90%', // Largura relativa
    maxWidth: 300, // Largura máxima
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalUsuario: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    maxHeight: '80%', // Altura máxima para o modal
  },
  modalPerfilImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default styles;
