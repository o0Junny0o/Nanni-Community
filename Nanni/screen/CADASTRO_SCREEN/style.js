import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#071934',
  },
  input: {
    borderWidth: 1,
    borderColor: '#163690',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: '#071934',
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#163690',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#071934',
  },
  showPasswordText: {
    color: '#163690',
    fontWeight: "bold",
    marginLeft: 10,
  },
  botao: {
    backgroundColor: '#5d90d6',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: '#163690',
    marginTop: 15,
    textAlign: "center",
  },
  fotoPerfilContainerRectangular: {
    width: '100%', // Ocupa a largura total
    height: 80, // Altura desejada
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfilRectangular: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  fotoPerfilPlaceholderRectangular: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFotoPerfilRectangular: {
    color: '#071934',
    textAlign: 'center',
  },
});

export default styles;