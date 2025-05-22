import { StyleSheet } from 'react-native';

const colors = {
  background: '#FFFFFF',
  mediumSkyBlue: '#5d90d6',
  darkRoyalBlue: '#163690',
  midnightBlue: '#071934',
  vividBlue: '#1D5DB5',
  softLilac: '#B88CB4',
  helperText: '#ff0000',
  white: '#FFFFFF',
  black: '#000000',
};

const fonts = {
  monospaceExtrabold: 'monospace',
  robotoMonoBold: 'RobotoMono-Bold',
  roboto: 'Roboto-Regular',
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 30,
    color: colors.midnightBlue,
    textAlign: 'center',
    fontFamily: fonts.robotoMonoBold,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderWidth: 1.5,
    borderColor: colors.softLilac,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    flex: 1,
    marginRight: -10,
    marginLeft: 2, // Reduzido de 10
    color: colors.midnightBlue,
    fontFamily: fonts.roboto,
    fontSize: 14, // Adicionado tamanho específico
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.softLilac,
    shadowColor: colors.midnightBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 12, // Reduzido de 14
    color: colors.midnightBlue,
    fontFamily: fonts.roboto,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16, // Reduzido de 18
    fontWeight: 'bold',
    color: colors.vividBlue,
    fontFamily: fonts.robotoMonoBold,
  },
  loadingText: {
    fontSize: 16,
    color: colors.midnightBlue,
    fontFamily: fonts.roboto,
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.helperText,
    fontFamily: fonts.roboto,
    textAlign: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    color: colors.midnightBlue,
    fontFamily: fonts.roboto,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
