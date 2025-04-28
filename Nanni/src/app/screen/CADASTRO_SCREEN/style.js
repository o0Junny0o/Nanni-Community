import { StyleSheet } from 'react-native';

const colors = {
  background: '#FFFFFF', 
  mediumSkyBlue: '#5d90d6',
  darkRoyalBlue: '#163690',
  midnightBlue: '#071934',
  vividBlue: '#1D5DB5',
  softLilac: '#B88CB4',
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
    backgroundColor: colors.background, 
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
    color: colors.midnightBlue,
    fontFamily: fonts.monospaceExtrabold,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.vividBlue,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: colors.midnightBlue,
    fontFamily: fonts.roboto,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.vividBlue,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.midnightBlue,
    fontFamily: fonts.roboto,
  },
  showPasswordText: {
    color: colors.vividBlue,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: fonts.robotoMonoBold,
  },
  botao: {
    width: '80%',
    backgroundColor: colors.mediumSkyBlue,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoTexto: {
    color: colors.background, 
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.robotoMonoBold,
  },
  link: {
    color: colors.vividBlue,
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
    borderColor: colors.darkRoyalBlue,
    backgroundColor: colors.softLilac,
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
    color: colors.darkRoyalBlue,
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