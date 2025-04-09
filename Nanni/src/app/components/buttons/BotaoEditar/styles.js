import { StyleSheet } from 'react-native';

const colors = {
  textDark: '#071934',
};

export const styles = StyleSheet.create({
  backButton: {
    padding: 15,
    marginBottom: 15,
    alignItems: 'flex-end',
  },

  text: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textDark,
  },
});

export default styles;
