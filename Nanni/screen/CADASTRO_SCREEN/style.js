import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Cor secundária
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
    color: "#000000", // Fonte cor preta
  },
  input: {
    borderWidth: 1,
    borderColor: "#A349A4", // Cor primária
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: "#000000", // Fonte cor preta
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A349A4", // Cor primária
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: "#000000", // Fonte cor preta
  },
  showPasswordText: {
    color: "#A349A4", // Cor primária
    fontWeight: "bold",
    marginLeft: 10,
  },
  botao: {
    backgroundColor: "#42FFA3", // Cor secundária
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#000000", // Fonte cor preta
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#A349A4", // Cor primária
    marginTop: 15,
    textAlign: "center",
  },
});

export default styles;
