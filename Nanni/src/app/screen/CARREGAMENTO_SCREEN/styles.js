import { StyleSheet } from 'react-native';

const colors = {
  background: '#FFFFFF',
  mediumSkyBlue: '#5d90d6',
  darkRoyalBlue: '#163690',
  midnightBlue: '#071934',
  vividBlue: '#1D5DB5',
  softLilac: '#B88CB4',
};

const fonts = {
  monospaceExtrabold: 'monospace',
  robotoMonoBold: 'RobotoMono-Bold',
  roboto: 'Roboto-Regular',
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.vividBlue,
  },
});

export default styles;
