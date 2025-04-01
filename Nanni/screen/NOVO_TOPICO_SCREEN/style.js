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
    marginTop: 16,
    marginBottom: 16,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#071934',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#163690',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 12,
    color: '#071934',
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  botaoCriar: {
    backgroundColor: '#5d90d6',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotaoCriar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default styles;