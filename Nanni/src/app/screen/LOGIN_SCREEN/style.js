import { StyleSheet } from 'react-native';

const colors = {
  primary: '#A349A4',
  secondary: '#42FFA3',
  text: '#000000',
  background: '#FFFFFF',
  overlayBackground: 'rgba(200, 200, 200, 0.4)',
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
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 5, 
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
  forgotPasswordLink: {
    color: colors.primary,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'right',
    width: '100%',
    fontFamily: fonts.roboto,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlayBackground,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
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