import { StyleSheet } from 'react-native';

const colors = {
  MediumSkyBlue: '#5d90d6',
  DarkRoyalBlue: '#163690',
  MidnightBlue: '#071934',
  VividBlue: '#1D5DB5',
  SoftLilac: '#B88CB4',
  white: '#FFFFFF',
  black: '#000000',
};

const fonts = {
  monospaceExtrabold: 'monospace',
  robotoMonoBold: 'RobotoMono-Bold',
  roboto: 'Roboto-Regular',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 15,
    zIndex: 1,
    padding: 10,
  },
  logo: {
    width: 300,
    height: 110,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: colors.MidnightBlue,
    fontFamily: fonts.monospaceExtrabold,
  },
  subtitulo: {
    fontSize: 15,
    marginBottom: 25,
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.roboto,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.SoftLilac,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    color: colors.MidnightBlue,
    fontFamily: fonts.roboto,
  },
  botao: {
    backgroundColor: colors.MidnightBlue,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  botaoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.robotoMonoBold,
  },
});

export default styles;
