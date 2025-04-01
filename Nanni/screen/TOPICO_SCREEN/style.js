import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  botaoVoltar: {
    marginBottom: 16,
    marginTop: 10, // Adicionei marginTop para abaixar o botão Voltar
  },
  textoBotaoVoltar: {
    fontSize: 16,
    color: '#163690',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#071934',
    textAlign: 'center',
  },
  containerTopico: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tituloTopico: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#071934',
  },
  cabecalhoTopico: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    color: '#163690',
  },
  conteudoTopico: {
    fontSize: 16,
    lineHeight: 24,
    color: '#071934',
  },
  tituloComentarios: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#071934',
  },
  listaComentarios: {
    marginBottom: 16,
  },
  itemComentario: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cabecalhoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 30, // Aumentei o tamanho do avatar
    height: 30, // Aumentei o tamanho do avatar
    borderRadius: 15, // Para torná-lo circular
    marginRight: 8,
  },
  autorComentario: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#071934',
  },
  dataComentario: {
    color: '#163690',
    fontSize: 12,
  },
  textoComentario: {
    fontSize: 16,
    lineHeight: 22,
    color: '#071934',
  },
  containerAdicionarComentario: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputComentario: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#163690',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 8,
    color: '#071934',
  },
  botaoEnviar: {
    backgroundColor: '#5d90d6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  textoBotaoEnviar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default styles;