// style.js
import { StyleSheet } from 'react-native';

const colors = {
  primary: '#A349A4',
  secondary: '#42FFA3',
  text: '#000000',
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#f9f9f9',
  border: '#ccc',
  darkBlue: '#071934',
  helperText: '#ff0000',
};

const fonts = {
  monospaceExtrabold: 'monospace', 
  robotoMonoBold: 'RobotoMono-Bold', 
  roboto: 'Roboto-Regular', 
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800', 
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
    fontFamily: fonts.monospaceExtrabold,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: colors.text,
    fontFamily: fonts.roboto,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.text,
    fontFamily: fonts.roboto,
  },
  showPasswordText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: fonts.robotoMonoBold,
  },
  botao: {
    width: '80%',
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoTexto: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.robotoMonoBold,
  },
  link: {
    color: colors.primary,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: fonts.roboto,
  },
  touchable_opacity: {
    width: '100%',
  },
  fotoPerfilContainerCircular: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  fotoPerfilCircular: {
    width: '100%',
    height: '100%',
  },
  fotoPerfilPlaceholderCircular: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFotoPerfilCircular: {
    color: colors.darkBlue,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.roboto,
  },
  helperText: {
    color: colors.helperText,
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: fonts.roboto,
  },
});

export default styles;