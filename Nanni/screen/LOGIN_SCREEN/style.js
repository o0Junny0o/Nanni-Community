import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 320,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#071934', // MidnightBlue
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#163690', // DarkRoyalBlue
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: '#071934', // MidnightBlue
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    borderWidth: 1,
    borderColor: '#163690', // DarkRoyalBlue
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#071934', // MidnightBlue
  },
  showPasswordText: {
    color: '#163690', // DarkRoyalBlue
    fontWeight: "bold",
    marginLeft: 10,
  },
  botao: {
    backgroundColor: '#5d90d6', // MediumSkyBlue
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: '100%',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: '#163690', // DarkRoyalBlue
    marginTop: 15,
    textAlign: "center",
  },
  forgotPasswordLink: {
    color: '#163690', // DarkRoyalBlue
    marginTop: 10,
    marginBottom: 20,
    textAlign: "right",
    width: '100%',
  },
});

export default styles;