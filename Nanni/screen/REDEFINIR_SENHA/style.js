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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#A349A4",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: "#000000",
  },
  passwordContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: '100%',
    borderWidth: 1,
    borderColor: "#A349A4",
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: "#000000",
  },
  botao: {
    backgroundColor: "#42FFA3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: '100%',
    marginBottom: 15,
  },
  botaoTexto: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  showPasswordText: {
    color: "#A349A4",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default styles;