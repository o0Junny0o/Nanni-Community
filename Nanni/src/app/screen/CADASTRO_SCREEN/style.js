import { StyleSheet } from 'react-native';

export const colors = {
  background: '#FFFFFF',
  mediumSkyBlue: '#5d90d6',
  darkRoyalBlue: '#163690',
  midnightBlue: '#071934',
  vividBlue: '#1D5DB5',
  softLilac: '#B88CB4',
  helperText: '#ff0000',
  white: '#FFFFFF',
  black: '#000000',
  successGreen: '#28a745',
};

export const fonts = {
  monospaceExtrabold: 'monospace',
  robotoMonoBold: 'RobotoMono-Bold',
  roboto: 'Roboto-Regular',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  logo: {
    width: 250,
    height: 70,
    resizeMode: 'contain',
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.monospaceExtrabold,
    fontSize: 20,
    color: colors.darkRoyalBlue,    
  },
  fotoPerfilContainerCircular: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.softLilac,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoPerfilCircular: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  fotoPerfilPlaceholderCircular: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFotoPerfilCircular: {
    marginBottom: 20,
    color: colors.midnightBlue,
    textAlign: 'center',
    fontFamily: fonts.roboto,    
  },
  cameraIconOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 75,
    padding: 6,
    color: colors.white,
    backgroundColor: colors.darkRoyalBlue,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.softLilac,
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: colors.black,
    fontFamily: fonts.roboto,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    paddingVertical: 6,
    borderColor: colors.softLilac,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  dateInputText: {
    flex: 1,
    color: colors.black,
  },
  dateInputPlaceholder: {
    flex: 1,
    color: colors.softLilac,
  },
  calendarIcon: {
    marginLeft: 0,
  },
  touchable_opacity: {
    width: '100%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.softLilac,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 5,
    color: colors.black,
    fontFamily: fonts.roboto,
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: colors.helperText,
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: fonts.roboto,
  },
  passwordHelperContainer: {
    width: '100%',
    marginTop: 6,
    marginBottom: 4,
  },
  passwordHelperTextItem: {
    fontFamily: fonts.roboto,
    marginBottom: 3,
    textAlign: 'left',
  },
  passwordHelperTextValid: {
    color: colors.successGreen,
  },
  passwordHelperTextInvalid: {
    color: colors.helperText,
  },
  showPasswordText: {
    color: colors.softLilac,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: fonts.robotoMonoBold,
  },
  botao: {
    width: '90%',
    backgroundColor: colors.midnightBlue,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoDesativado: {
    backgroundColor: '#a9a9a9',
    opacity: 0.7,
  },
  botaoTexto: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.robotoMonoBold,
  },
  link: {
    color: colors.softLilac,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fonts.roboto,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default styles;
