import { StyleSheet } from 'react-native';

const colors = {
  primary: '#5d90d6',
  white: '#FFFFFF',
  shadowLight: '#00000033',
};

export const styles = StyleSheet.create({
  EditButton: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: '70%',
    borderRadius: 15,
    boxShadow: colors.shadowLight,
  },

  text: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.white,
  },
});

export default styles;
