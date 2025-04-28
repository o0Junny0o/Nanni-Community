import {
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native';

// eslint-disable-next-line no-unused-vars
const { width, height } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();

const colors = {
  primary: '#2F80ED',
  background: '#FFFFFF',
  disabled: '#BDBDBD',
  text: '#2D3436',
  subtext: '#636E72',
  overlay: 'rgba(0, 0, 0, 0.7)',
  preto: '#000',
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  },

  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.select({
      android: StatusBar.currentHeight,
      ios: 45,
    }),
    backgroundColor: colors.overlay,
  },

  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    paddingTop: 0,
    width: '90%',
    maxWidth: 300,
    marginHorizontal: 20,
    elevation: 8,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  icon: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    maxHeight: height * 0.24,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  title: {
    fontSize: fontScale * 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },

  message: {
    fontSize: fontScale * 16,
    color: colors.subtext,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  disabledButton: {
    backgroundColor: colors.disabled,
  },

  buttonText: {
    color: colors.background,
    fontSize: fontScale * 16,
    fontWeight: '600',
    letterSpacing: 0.25,
    includeFontPadding: false,
  },
});

export { styles };
