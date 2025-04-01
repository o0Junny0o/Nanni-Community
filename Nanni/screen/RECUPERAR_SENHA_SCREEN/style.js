import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    color: "#000000",
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#071934",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: "#000000",
  },
  botao: {
    backgroundColor: "#5d90d6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: '100%',
    marginBottom: 15, // Espaçamento entre os botões
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;