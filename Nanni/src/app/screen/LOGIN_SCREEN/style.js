import { StyleSheet } from 'react-native';

const colors = {
  primary: '#A349A4',
  secondary: '#42FFA3',
  text: '#000000',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: colors.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.text,
  },
  showPasswordText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  botao: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoTexto: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: colors.primary,
    marginTop: 15,
    textAlign: 'center',
  },
  forgotPasswordLink: {
    color: "#A349A4",
    marginTop: 10, 
    marginBottom: 20, 
    textAlign: "right",
    width: '100%',
  },
});

export default styles;
