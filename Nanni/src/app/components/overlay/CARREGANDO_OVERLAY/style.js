import { StyleSheet } from 'react-native';

const colors = {
  overlayBackground: 'rgba(200, 200, 200, 0.4)',
};

const styles = StyleSheet.create({
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
});

export default styles;
