import { StyleSheet } from 'react-native';

const colors = {
  textDark: '#071934',
  shadowLight: '#00000033',
  buttonBackground: '#aaa6',
};

export const styles = StyleSheet.create({
  EditButton: {
    padding: 15,
    margin: 5,
    alignItems: 'flex-end',
    backgroundColor: colors.buttonBackground,
    width: 70,
    borderRadius: 15,
    boxShadow: colors.shadowLight,
  },

  text: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textDark,
  },
});

export default styles;
